import { IsBoolean, IsDate, IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { MemberOutputDTO } from './member.dto';
import { RoleOutputDTO } from './role.dto'; 

export class CreateDevotionalInputDTO {
    @IsNotEmpty({ message: 'Title is required' })
    @IsString({ message: 'Title must be a string' })
    title: string;

    @IsNotEmpty({ message: 'Verse text is required' })
    @IsString({ message: 'Verse text must be a string' })
    verse_text: string;

    @IsNotEmpty({ message: 'Content is required' })
    @IsString({ message: 'Content must be a string' })
    content: string;

    @IsNotEmpty({ message: 'Bible reference is required' })
    @IsString({ message: 'Bible reference must be a string' })
    reference: string;

    @IsOptional()
    @IsString({ message: 'Image URL must be a string' })
    image_url?: string;

    @IsOptional()
    @IsInt({ message: 'Author ID must be a valid number' })
    author_id: number;

    @IsOptional()
    @IsInt({ message: 'Target role ID must be a valid number' })
    target_role_id?: number;
}

export class DevotionalOutputDTO {
    public constructor(
        public id: number,
        public title: string,
        public verse_text: string,
        public content: string,
        public reference: string,
        public publication_date: Date,
        public image_url?: string,
        public author?: MemberOutputDTO,
        public target_role?: RoleOutputDTO,
    ) {}
}