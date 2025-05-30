import { In, Like, Repository } from "typeorm";
import { CreateMemberInputDTO, MemberOutputDTO, UpdateMemberInputDTO } from "../dto/member.dto";
import { Member } from "../entity/Member";
import { AppDataSource } from "../data-source";
import { MemberMapper } from "../mapper/MemberMapper";
import { Family } from "../entity/Family";
import { NotFoundException } from "../exception/NotFoundException";
import { Ministry } from "../entity/Ministry";
import { fromValue } from "../helpers/fromValue";
import { Gender } from "../enum/Gender";
import { Role } from "../entity/Role";

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
    private roleRepository: Repository<Role>;

    public constructor() {
        this.memberRepository = AppDataSource.getRepository(Member);
        this.familyRepository = AppDataSource.getRepository(Family);
        this.ministryRepository = AppDataSource.getRepository(Ministry);
    }

    async update(id: number, input: UpdateMemberInputDTO): Promise<MemberOutputDTO> {
        const isAdminUpdate = id !== input.id;

        if (isAdminUpdate) {
            await this.checkPrivileges(id);
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
        member.phone = input.phone;
        member.email = input.email;
        member.imageUrl = input.image_url;
        
        await this.syncRelations(input, member);

        const updatedMember = await this.memberRepository.save(member);

        return this.find(updatedMember.id);
    }

    async find(id: number): Promise<MemberOutputDTO> {
        const member = await this.memberRepository.findOne({
            where: {
                id: id,
            },
            relations: {
                family: true,
                ministries: true,
                role: true,
            }
        });
        if (!member) {
            throw new NotFoundException('Membro não encontrado');
        }

        return MemberMapper.entityToOutput(member);
    }

    async create(input: CreateMemberInputDTO): Promise<MemberOutputDTO> {
        const member = MemberMapper.inputToEntity(input);

        await this.syncRelations(input, member);

        const result = await this.memberRepository.save(member);

        return MemberMapper.entityToOutput(result);
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
        // if (![Role.DEACON, Role.LEADER, Role.PASTOR].includes(member.role)) {
        //     throw new UnauthorizedException('Você não tem privilégios para executar essa ação');
        // }
    }

    private async syncRelations(input: CreateMemberInputDTO, member: Member) {
        const ministries = await this.ministryRepository.find({
            where: {
                id: In(input.ministries.map((ministryInput) => ministryInput.ministry_id)),
            }
        });
        member.ministries = ministries;

        const family = await this.familyRepository.findOne({
            where: {
                id: input.family_id,
            }
        });
        member.family = family;
    
        const role = await this.roleRepository.findOne({
            where: {
                id: input.role_id,
            }
        });
        member.role = role;
    }
}