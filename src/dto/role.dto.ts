import { IsNotEmpty, IsString, IsEnum, IsOptional } from 'class-validator';
import { RoleCredentials } from '../enum/RoleCredentials';
import { MemberOutputDTO } from './member.dto';

export class CreateRoleInputDTO {
    @IsNotEmpty({ message: 'Name is required' })
    @IsString({ message: 'Name must be a string' })
    name: string;

    @IsNotEmpty({ message: 'Credentials are required' })
    @IsEnum(RoleCredentials, { message: 'Invalid credentials value' })
    credentials: RoleCredentials;
}

export class UpdateRoleInputDTO {
    @IsOptional()
    @IsString({ message: 'Name must be a string' })
    name?: string;

    @IsOptional()
    @IsEnum(RoleCredentials, { message: 'Invalid credentials value' })
    credentials?: RoleCredentials;
}

export class RoleOutputDTO {
    public constructor(
        public id: number,
        public name: string,
        public credentials: RoleCredentials,
        public members?: MemberOutputDTO[],
    ) {}
}