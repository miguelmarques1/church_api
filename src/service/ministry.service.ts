import { Repository } from "typeorm";
import { CreateMinistryInputDTO, MinistryOutputDTO } from "../dto/ministry.dto";
import { Ministry } from "../entity/Ministry";
import { AppDataSource } from "../data-source";
import { MinistryMapper } from "../mapper/MinistryMapper";

export interface MinistryServiceInterface {
    findAll(): Promise<MinistryOutputDTO[]>;
    create(input: CreateMinistryInputDTO): Promise<MinistryOutputDTO>;
}

export class MinistryService implements MinistryServiceInterface {
    private ministryRepository: Repository<Ministry>;
    
    public constructor() {
        this.ministryRepository = AppDataSource.getRepository(Ministry);
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