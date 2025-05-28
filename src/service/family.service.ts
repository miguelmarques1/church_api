import { getCustomRepository, Repository } from "typeorm";
import { CreateFamilyInputDTO, FamilyOutputDTO } from "../dto/family.dto";
import { Family } from "../entity/Family";
import { AppDataSource } from "../data-source";
import { FamilyMapper } from "../mapper/FamilyMapper";

export interface FamilyServiceInterface {
    create(input: CreateFamilyInputDTO): Promise<FamilyOutputDTO>;
    list(): Promise<FamilyOutputDTO[]>;
}

export class FamilyService implements FamilyServiceInterface {
    private familyRepository: Repository<Family>;

    public constructor() {
        this.familyRepository = AppDataSource.getRepository(Family);
    }
    
    async create(input: CreateFamilyInputDTO): Promise<FamilyOutputDTO> {
        const family = FamilyMapper.inputToEntity(input);

        const result = await this.familyRepository.save(family);
        
        return FamilyMapper.entityToOutput(result);
    }

    async list(): Promise<FamilyOutputDTO[]> {
        const families = await this.familyRepository.find();
        
        const output = [];
        for(let family of families) {
            const dto = FamilyMapper.entityToOutput(family);
            output.push(dto);
        }

        return output;
    }
}