import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Role } from "../entity/Role";
import { RoleOutputDTO } from "../dto/role.dto";
import { RoleMapper } from "../mapper/RoleMapper";

export interface RoleServiceInterface {
    list(): Promise<RoleOutputDTO[]>;
}

export class RoleService implements RoleServiceInterface {
    private roleRepository: Repository<Role>;

    public constructor() {
        this.roleRepository = AppDataSource.getRepository(Role);
    }


    async list(): Promise<RoleOutputDTO[]> {
        const devotionals = await this.roleRepository.find();

        return devotionals.map(RoleMapper.entityToOutput);
    }

}