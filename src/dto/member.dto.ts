import { IsArray, IsDate, IsEmail, IsEnum, IsInt, isInt, IsNumber, IsOptional, IsPositive, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Gender } from '../enum/Gender';
import { Role } from '../enum/RoleType';
import { FamilyOutputDTO } from './family.dto';
import { MinistryOutputDTO } from './ministry.dto';

export class MemberMinistryDTO {
    @IsNumber({}, { 
        message: 'O ID do ministério deve ser um número válido' 
    })
    ministry_id: number;
}

export class CreateMemberInputDTO {
    @IsString({ 
        message: 'O nome deve ser um texto válido' 
    })
    name: string;

    @IsOptional()
    @IsDate({ 
        message: 'A data de nascimento deve estar em um formato válido' 
    })
    @Type(() => Date)
    birthdate?: Date;

    @IsString({ 
        message: 'O gênero deve ser um texto válido' 
    })
    @IsEnum(Gender, { 
        message: `Gênero inválido. Opções válidas: ${Object.values(Gender).join(', ')}` 
    })
    gender: string;

    @IsString({ 
        message: 'O cargo deve ser um texto válido' 
    })
    @IsEnum(Role, { 
        message: `Cargo inválido. Opções válidas: ${Object.values(Role).join(', ')}` 
    })
    role: string;

    @IsString({ 
        message: 'O telefone deve ser um texto válido' 
    })
    phone: string;

    @IsOptional()
    @IsEmail({}, { 
        message: 'O e-mail deve estar em um formato válido (ex: usuario@exemplo.com)' 
    })
    email?: string;

    @IsOptional()
    @IsString({ 
        message: 'A URL da imagem deve ser um texto válido' 
    })
    image_url?: string;

    @IsNumber({}, { 
        message: 'O ID da família deve ser um número válido' 
    })
    family_id: number;

    @IsOptional()
    @IsArray({ 
        message: 'Os ministérios devem ser enviados em formato de lista' 
    })
    @ValidateNested({ each: true, message: 'Cada ministério deve conter um ID válido' })
    @Type(() => MemberMinistryDTO)
    ministries?: MemberMinistryDTO[];
}

export class UpdateMemberInputDTO {
    @IsOptional()
    @IsInt({
        message: 'O ID deve ser um inteiro',
    })
    @IsPositive({
        message: 'O ID deve ser um número válido'
    })
    id: number;

    @IsString({ 
        message: 'O nome deve ser um texto válido' 
    })
    name: string;

    @IsOptional()
    @IsDate({ 
        message: 'A data de nascimento deve estar em um formato válido' 
    })
    @Type(() => Date)
    birthdate?: Date;

    @IsString({ 
        message: 'O gênero deve ser um texto válido' 
    })
    @IsEnum(Gender, { 
        message: `Gênero inválido. Opções válidas: ${Object.values(Gender).join(', ')}` 
    })
    gender: string;

    @IsString({ 
        message: 'O cargo deve ser um texto válido' 
    })
    @IsEnum(Role, { 
        message: `Cargo inválido. Opções válidas: ${Object.values(Role).join(', ')}` 
    })
    role: string;

    @IsString({ 
        message: 'O telefone deve ser um texto válido' 
    })
    phone: string;

    @IsOptional()
    @IsEmail({}, { 
        message: 'O e-mail deve estar em um formato válido (ex: usuario@exemplo.com)' 
    })
    email?: string;

    @IsOptional()
    @IsString({ 
        message: 'A URL da imagem deve ser um texto válido' 
    })
    image_url?: string;

    @IsNumber({}, { 
        message: 'O ID da família deve ser um número válido' 
    })
    family_id: number;

    @IsOptional()
    @IsArray({ 
        message: 'Os ministérios devem ser enviados em formato de lista' 
    })
    @ValidateNested({ each: true, message: 'Cada ministério deve conter um ID válido' })
    @Type(() => MemberMinistryDTO)
    ministries?: MemberMinistryDTO[];
}

export class MemberOutputDTO {
    public constructor(
        public id: number,
        public name: string,
        public phone: string,
        public role: string,
        public gender: string,
        public family: FamilyOutputDTO,
        public email?: string,
        public birthdate?: Date,
        public imageUrl?: string,
        public ministries?: MinistryOutputDTO[],
    ) { }
}