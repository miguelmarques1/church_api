import { CreateMinistryInputDTO, MinistryOutputDTO } from "../dto/ministry.dto";
import { Ministry } from "../entity/Ministry";
import { FamilyMapper } from "./FamilyMapper";


export class MinistryMapper {
    static inputToEntity(input: CreateMinistryInputDTO): Ministry {
        const ministry = new Ministry();
        ministry.name = input.name;

        return ministry;
    }

    static entityToOutput(input: Ministry): MinistryOutputDTO {
        return new MinistryOutputDTO(
            input.id,
            input.name,
        );
    }
}