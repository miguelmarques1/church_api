import { IsDate, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { MemberOutputDTO } from './member.dto';

export class CreateDevotionalInputDTO {
    @IsNotEmpty({ message: 'Title is required' })
    @IsString({ message: 'Title must be a string' })
    title: string;

    @IsNotEmpty({ message: 'Content is required' })
    @IsString({ message: 'Content must be a string' })
    content: string;

    @IsNotEmpty({ message: 'Publication date is required' })
    @IsDate({ message: 'Invalid date format' })
    publicationDate: Date;

    @IsNotEmpty({ message: 'Author ID is required' })
    authorId: number;

    @IsOptional()
    @IsEnum(['all', 'leaders'], { 
        message: 'Target audience must be either "all" or "leaders"' 
    })
    targetAudience?: 'all' | 'leaders' = 'all';

    @IsOptional()
    @IsString({ message: 'Reference verse must be a string' })
    referenceVerse?: string;
}

export class DevotionalOutputDTO {
    public constructor(
        public id: number,
        public title: string,
        public content: string,
        public publicationDate: Date,
        public author: MemberOutputDTO,
        public targetAudience: 'all' | 'leaders',
        public referenceVerse?: string,
    ) {}
}