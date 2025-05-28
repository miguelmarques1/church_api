import { CreateFamilyInputDTO, FamilyOutputDTO } from "../dto/family.dto";
import { Family } from "../entity/Family";

export class FamilyMapper {
    static inputToEntity(input: CreateFamilyInputDTO): Family {
        const family = new Family()
        family.address = input.address;
        family.name = input.name;
        family.phone = input.phone;
        family.receiveSupport = input.receive_support;

        return family;
    }

    static entityToOutput(input: Family): FamilyOutputDTO {
        return new FamilyOutputDTO(
            input.id,
            input.name,
            input.receiveSupport,
            input.phone,
            input.address,
        )
    }
}