import { IsArray, IsBoolean, IsDate, IsDateString, IsEnum, IsInt, IsOptional, IsPositive, IsString, IsUrl, ValidateIf, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { MemberOutputDTO } from './member.dto';
import { RecurrencePattern } from '../enum/RecurrencePattern';

export class EventAttendeeDTO {
    @IsInt({ message: 'O ID do membro deve ser um número válido' })
    @IsPositive({ message: 'O ID do membro deve ser positivo' })
    member_id: number;
}

export class CreateEventInputDTO {
    @IsString({ message: 'O título deve ser um texto válido' })
    title: string;

    @IsOptional()
    @IsString({ message: 'A descrição deve ser um texto válido' })
    description?: string;

    @IsDate({ message: 'A data do evento deve estar em um formato válido' })
    @Type(() => Date)
    date: Date;

    @IsString({ message: 'O local deve ser um texto válido' })
    location: string;

    @IsOptional()
    @IsUrl({}, { message: 'A URL da imagem deve ser válida' })
    image_url?: string;

    @IsOptional()
    @IsBoolean({ message: 'Recorrente deve ser verdadeiro ou falso' })
    recurring?: boolean;

    @IsOptional()
    @IsEnum(RecurrencePattern, {
        message: `Padrão de recorrência inválido. Opções válidas: ${Object.values(RecurrencePattern).join(', ')}`
    })
    recurrence_pattern?: RecurrencePattern;

    @IsOptional()
    @IsDate({ message: 'A data final deve estar em um formato válido' })
    @Type(() => Date)
    end_date?: Date;

    @IsOptional()
    @IsInt({ message: 'O ID do organizador deve ser um número válido' })
    @IsPositive({ message: 'O ID do organizador deve ser positivo' })
    organizer_id?: number;

    @IsOptional()
    @IsString({ message: 'A categoria deve ser um texto válido' })
    category?: string;

    @IsOptional()
    @IsArray({ message: 'Os participantes devem ser enviados em formato de lista' })
    @ValidateNested({ each: true, message: 'Cada participante deve conter um ID válido' })
    @Type(() => EventAttendeeDTO)
    attendees?: EventAttendeeDTO[];
}

export class UpdateEventInputDTO {
    @IsOptional()
    @IsInt({ message: 'O ID deve ser um número válido' })
    @IsPositive({ message: 'O ID deve ser positivo' })
    id: number;

    @IsOptional()
    @IsString({ message: 'O título deve ser um texto válido' })
    title?: string;

    @IsOptional()
    @IsString({ message: 'A descrição deve ser um texto válido' })
    description?: string;

    @IsOptional()
    @IsDate({ message: 'A data do evento deve estar em um formato válido' })
    @Type(() => Date)
    date?: Date;

    @IsOptional()
    @IsString({ message: 'O local deve ser um texto válido' })
    location?: string;

    @IsOptional()
    @IsUrl({}, { message: 'A URL da imagem deve ser válida' })
    image_url?: string;

    @IsOptional()
    @IsBoolean({ message: 'Recorrente deve ser verdadeiro ou falso' })
    recurring?: boolean;

    @IsOptional()
    @IsEnum(RecurrencePattern, {
        message: `Padrão de recorrência inválido. Opções válidas: ${Object.values(RecurrencePattern).join(', ')}`
    })
    recurrence_pattern?: RecurrencePattern;

    @IsOptional()
    @IsDate({ message: 'A data final deve estar em um formato válido' })
    @Type(() => Date)
    end_date?: Date;

    @IsOptional()
    @IsInt({ message: 'O ID do organizador deve ser um número válido' })
    @IsPositive({ message: 'O ID do organizador deve ser positivo' })
    organizer_id?: number;

    @IsOptional()
    @IsString({ message: 'A categoria deve ser um texto válido' })
    category?: string;

    @IsOptional()
    @IsArray({ message: 'Os participantes devem ser enviados em formato de lista' })
    @ValidateNested({ each: true, message: 'Cada participante deve conter um ID válido' })
    @Type(() => EventAttendeeDTO)
    attendees?: EventAttendeeDTO[];
}

export class EventOutputDTO {
    public constructor(
        public id: number,
        public title: string,
        public date: Date,
        public location: string,
        public description?: string,
        public image_url?: string,
        public recurring?: boolean,
        public recurrence_pattern?: RecurrencePattern,
        public end_date?: Date,
        public organizer?: MemberOutputDTO,
        public category?: string,
        public attendees?: number,
    ) { }
}