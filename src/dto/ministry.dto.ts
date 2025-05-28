import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateMinistryInputDTO {
    @IsNotEmpty({ message: 'O nome do ministério é obrigatório' })
    @IsString({ message: 'O nome deve ser uma string' })
    @MinLength(3, { message: 'O nome deve ter pelo menos 3 caracteres' })
    @MaxLength(100, { message: 'O nome não pode exceder 100 caracteres' })
    name: string;
} 

export class MinistryOutputDTO {
    public constructor(
        public id: number,
        public name: string,
    ) { }
}