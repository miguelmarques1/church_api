import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateFamilyInputDTO {
    @IsNotEmpty({ message: 'O nome da família é obrigatório' })
    @IsString({ message: 'O nome deve ser uma string' })
    @MaxLength(100, { message: 'O nome não pode ter mais de 100 caracteres' })
    name: string;

    @IsOptional()
    @IsString({ message: 'O telefone deve ser uma string' })
    @MaxLength(20, { message: 'O telefone não pode ter mais de 20 caracteres' })
    phone?: string;

    @IsOptional()
    @IsString({ message: 'O endereço deve ser uma string' })
    @MaxLength(200, { message: 'O endereço não pode ter mais de 200 caracteres' })
    address?: string;

    @IsNotEmpty({ message: 'O campo receive_support é obrigatório' })
    @IsBoolean({ message: 'receive_support deve ser um valor booleano' })
    receive_support: boolean;
}

export class FamilyOutputDTO {
    public constructor(
        public id: number,
        public name: string,
        public receive_support: boolean,
        public phone?: string,
        public address?: string,
    ) {}
}