import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Devotional } from "../entity/Devotional";
import { Member } from "../entity/Member";
import { DevotionalMapper } from "../mapper/DevotionalMapper";
import { CreateDevotionalInputDTO, DevotionalOutputDTO } from "../dto/devotional.dto";
import { NotFoundException } from "../exception/NotFoundException";
import { Role } from "../entity/Role";

export interface DevotionalServiceInterface {
    create(input: CreateDevotionalInputDTO): Promise<DevotionalOutputDTO>;
    find(id: number): Promise<DevotionalOutputDTO>;
    list(): Promise<DevotionalOutputDTO[]>;
}

export class DevotionalService implements DevotionalServiceInterface {
    private devotionalRepository: Repository<Devotional>;
    private memberRepository: Repository<Member>;
    private roleRepository: Repository<Role>;

    public constructor() {
        this.devotionalRepository = AppDataSource.getRepository(Devotional);
        this.memberRepository = AppDataSource.getRepository(Member);
        this.roleRepository = AppDataSource.getRepository(Role);
    }

    async create(input: CreateDevotionalInputDTO): Promise<DevotionalOutputDTO> {
        const devotional = DevotionalMapper.inputToEntity(input);

        await this.syncRelations(input, devotional);

        const result = await this.devotionalRepository.save(devotional);

        return this.find(result.id);
    }

    async find(id: number): Promise<DevotionalOutputDTO> {
        const devotional = await this.devotionalRepository.findOne({
            where: {
                id: id,
            },
            relations: {
                author: {
                    family: true,
                    role: true,
                },
            },
        });
        if(!devotional) {
            throw new NotFoundException('Devocional não encontrado');
        }

        return DevotionalMapper.entityToOutput(devotional);
    }

    async list(): Promise<DevotionalOutputDTO[]> {
        const devotionals = await this.devotionalRepository.find({
            relations: {
                author: {
                    family: true,
                    role: true,
                }
            }
        });

        return devotionals.map(DevotionalMapper.entityToOutput);
    }

    private async syncRelations(input: CreateDevotionalInputDTO, devotional: Devotional) {
        const author = await this.memberRepository.findOne({
            where: {
                id: input.author_id,
            }
        });
        if(!author) {
            throw new NotFoundException('Autor não encontrado');
        }
        devotional.author = author;

        if(input.target_role_id == null) {
            return;
        }

        const targetRole = await this.roleRepository.findOne({
            where: {
                id: input.target_role_id,
            }
        });
        devotional.targetRole = targetRole;
    }
}