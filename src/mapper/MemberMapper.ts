import { CreateMemberInputDTO, MemberOutputDTO } from "../dto/member.dto";
import { Member } from "../entity/Member";
import { Gender } from "../enum/Gender";
import { Role } from "../enum/RoleType";
import { fromValue } from "../helpers/fromValue";
import { generatePassword } from "../helpers/generatePassword";
import { FamilyMapper } from "./FamilyMapper";
import { MinistryMapper } from "./MinistryMapper";


export class MemberMapper {
    static inputToEntity(input: CreateMemberInputDTO): Member {
        const member = new Member()
        member.name = input.name;
        member.birthdate = input.birthdate;
        member.gender = fromValue(Gender, input.gender);
        member.role = fromValue(Role, input.role);
        member.phone = input.phone;
        member.email = input.email;
        member.imageUrl = input.image_url;
        member.password = generatePassword();

        return member;
    }

    static entityToOutput(input: Member): MemberOutputDTO {
        return new MemberOutputDTO(
            input.id,
            input.name,
            input.phone,
            input.role,
            input.gender,
            FamilyMapper.entityToOutput(input.family),
            input.email,
            input.birthdate,
            input.imageUrl,
            input.ministries?.map((ministry) => MinistryMapper.entityToOutput(ministry)),
        )
    }
}