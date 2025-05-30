import { CreateRoleInputDTO, RoleOutputDTO, UpdateRoleInputDTO } from "../dto/role.dto";
import { Role } from "../entity/Role";
import { MemberMapper } from "./MemberMapper";

export class RoleMapper {
    static inputToEntity(input: CreateRoleInputDTO | UpdateRoleInputDTO): Role {
        const role = new Role();
        role.name = input.name;
        role.credentials = input.credentials;
        return role;
    }

    static entityToOutput(entity: Role): RoleOutputDTO {
        return new RoleOutputDTO(
            entity.id,
            entity.name,
            entity.credentials,
            entity.members?.map(MemberMapper.entityToOutput)
        );
    }

    static updateEntity(entity: Role, input: UpdateRoleInputDTO): Role {
        if (input.name !== undefined) {
            entity.name = input.name;
        }
        if (input.credentials !== undefined) {
            entity.credentials = input.credentials;
        }
        return entity;
    }
}