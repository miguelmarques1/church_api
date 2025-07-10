import { Repository } from "typeorm";
import { CreateMinistryInputDTO, MinistryOutputDTO } from "../dto/ministry.dto";
import { Ministry } from "../entity/Ministry";
import { AppDataSource } from "../data-source";
import { MinistryMapper } from "../mapper/MinistryMapper";

export interface MinistryServiceInterface {
    findAll(): Promise<MinistryOutputDTO[]>;
    create(input: CreateMinistryInputDTO): Promise<MinistryOutputDTO>;
    find(id: number): Promise<MinistryOutputDTO>;
    update(id: number, input: CreateMinistryInputDTO): Promise<MinistryOutputDTO>;
}

export class MinistryService implements MinistryServiceInterface {
    private ministryRepository: Repository<Ministry>;
    
    public constructor() {
        this.ministryRepository = AppDataSource.getRepository(Ministry);
    }

    async find(id: number): Promise<MinistryOutputDTO> {
        const ministry = await this.ministryRepository.findOne({
            where: { id: id },
        });
        if (!ministry) {
            throw new Error('Ministério não encontrado');
        }

        return MinistryMapper.entityToOutput(ministry);
    }

    async update(id: number, input: CreateMinistryInputDTO): Promise<MinistryOutputDTO> {
        const ministry = await this.ministryRepository.findOne({
            where: { id: id },
        });
        if (!ministry) {
            throw new Error('Ministério não encontrado');
        }

        ministry.name = input.name;

        const result = await this.ministryRepository.save(ministry);
        
        return MinistryMapper.entityToOutput(result);
    }

    async findAll(): Promise<MinistryOutputDTO[]> {
        const ministries = await this.ministryRepository.find();
        
        return ministries.map(MinistryMapper.entityToOutput);
    }

    async create(input: CreateMinistryInputDTO): Promise<MinistryOutputDTO> {
        const ministry = MinistryMapper.inputToEntity(input);

        const result = await this.ministryRepository.save(ministry);
        
        return MinistryMapper.entityToOutput(result);
    }
}