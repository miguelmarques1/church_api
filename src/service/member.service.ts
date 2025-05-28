import { Like, Repository } from "typeorm";
import { CreateMemberInputDTO, MemberMinistryDTO, MemberOutputDTO, UpdateMemberInputDTO } from "../dto/member.dto";
import { Member } from "../entity/Member";
import { AppDataSource } from "../data-source";
import { MemberMapper } from "../mapper/MemberMapper";
import { FamilyService, FamilyServiceInterface } from "./family.service";
import { Family } from "../entity/Family";
import { NotFoundException } from "../exception/NotFoundException";
import { Ministry } from "../entity/Ministry";
import { Role } from "../enum/RoleType";
import { UnauthorizedException } from "../exception/UnauthorizedException";
import { fromValue } from "../helpers/fromValue";
import { Gender } from "../enum/Gender";

export interface MemberServiceInterface {
    create(input: CreateMemberInputDTO): Promise<MemberOutputDTO>;
    list(query?: string): Promise<MemberOutputDTO[]>;
    find(id: number): Promise<MemberOutputDTO>;
    update(id: number, input: UpdateMemberInputDTO): Promise<MemberOutputDTO>;
}

export class MemberService implements MemberServiceInterface {
    private memberRepository: Repository<Member>;
    private familyRepository: Repository<Family>;
    private ministryRepository: Repository<Ministry>;

    public constructor() {
        this.memberRepository = AppDataSource.getRepository(Member);
        this.familyRepository = AppDataSource.getRepository(Family);
        this.ministryRepository = AppDataSource.getRepository(Ministry);
    }

    async update(id: number, input: UpdateMemberInputDTO): Promise<MemberOutputDTO> {
        const isAdminUpdate = id !== input.id;

        if (isAdminUpdate) {
            this.checkPrivileges(id);
        }

        const member = await this.memberRepository.findOne({
            where: { id: input.id },
            relations: ['ministries'] 
        });

        if (!member) {
            throw new NotFoundException('Membro não encontrado');
        }

        member.name = input.name;
        member.birthdate = input.birthdate;
        member.gender = fromValue(Gender, input.gender);
        member.role = fromValue(Role, input.role);
        member.phone = input.phone;
        member.email = input.email;
        member.imageUrl = input.image_url;

        const updatedMember = await this.memberRepository.save(member);

        return MemberMapper.entityToOutput(updatedMember);
    }

    async find(id: number): Promise<MemberOutputDTO> {
        const member = await this.memberRepository.findOne({
            where: {
                id: id,
            },
            relations: {
                family: true,
                ministries: true,
            }
        });
        if (!member) {
            throw new NotFoundException('Membro não encontrado');
        }

        return MemberMapper.entityToOutput(member);
    }

    async create(input: CreateMemberInputDTO): Promise<MemberOutputDTO> {
        const family = await this.findFamily(input.family_id);
        const ministries = await this.findMinistries(input.ministries ?? []);

        const member = MemberMapper.inputToEntity(input);
        member.family = family;
        member.ministries = ministries;

        const result = await this.memberRepository.save(member);

        return MemberMapper.entityToOutput(result);
    }

    private async findFamily(id: number): Promise<Family> {
        const family = await this.familyRepository.findOne({
            where: {
                id: id,
            }
        });
        if (!family) {
            throw new NotFoundException('Família não encontrada');
        }

        return family;
    }

    private async findMinistries(ministries: MemberMinistryDTO[]): Promise<Ministry[]> {
        if (!ministries || ministries.length === 0) {
            return [];
        }

        const ministryIds = [...new Set(ministries.map(m => m.ministry_id))];

        const result = await this.ministryRepository.find({
            where: ministryIds.map(id => ({ id }))
        });

        const foundIds = result.map(m => m.id);
        const missingIds = ministryIds.filter(id => !foundIds.includes(id));

        if (missingIds.length > 0) {
            throw new NotFoundException(
                `Ministérios não encontrados: ${missingIds.join(', ')}`
            );
        }

        return result;
    }

    async list(query?: string): Promise<MemberOutputDTO[]> {
        const members = await this.memberRepository.find({
            where: query ? { name: Like(`%${query}%`) } : {},
            relations: {
                family: true,
                ministries: true
            },
            order: { name: 'ASC' }
        });

        return members.map(member => MemberMapper.entityToOutput(member));
    }

    private async checkPrivileges(id: number) {
        const member = await this.memberRepository.findOne({
            where: {
                id: id,
            }
        });
        if (![Role.DEACON, Role.LEADER, Role.PASTOR].includes(member.role)) {
            throw new UnauthorizedException('Você não tem privilégios para executar essa ação');
        }
    }
}