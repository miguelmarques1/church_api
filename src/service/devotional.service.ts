import { Repository } from "typeorm";
import { CreateFamilyInputDTO, FamilyOutputDTO } from "../dto/family.dto";
import { Family } from "../entity/Family";
import { AppDataSource } from "../data-source";
import { FamilyMapper } from "../mapper/FamilyMapper";
import { Devotional } from "../entity/Devotional";
import { Member } from "../entity/Member";
import { DevotionalMapper } from "../mapper/DevotionalMapper";
import { CreateDevotionalInputDTO, DevotionalOutputDTO } from "../dto/devotional.dto";
import { NotFoundException } from "../exception/NotFoundException";

export interface DevotionalServiceInterface {
    create(input: CreateDevotionalInputDTO): Promise<DevotionalOutputDTO>;
    list(): Promise<DevotionalOutputDTO[]>;
}

export class DevotionalService implements DevotionalServiceInterface {
    private devotionalRepository: Repository<Devotional>;
    private memberRepository: Repository<Member>;

    public constructor() {
        this.devotionalRepository = AppDataSource.getRepository(Devotional);
        this.memberRepository = AppDataSource.getRepository(Member);
    }

    async create(input: CreateDevotionalInputDTO): Promise<DevotionalOutputDTO> {
        const devotional = DevotionalMapper.inputToEntity(input);
        const author = await this.memberRepository.findOne({
            where: {
                id: input.authorId,
            }
        });
        if(!author) {
            throw new NotFoundException('Autor não encontrado');
        }

        devotional.author = author;

        const result = await this.devotionalRepository.save(devotional);

        return DevotionalMapper.entityToOutput(result);
    }

    async list(): Promise<DevotionalOutputDTO[]> {
        const devotionals = await this.devotionalRepository.find();

        return devotionals.map(DevotionalMapper.entityToOutput);
    }

}