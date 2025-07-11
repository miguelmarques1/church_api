import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsDate } from 'class-validator';
import { MemberOutputDTO } from './member.dto'; 

export class CreateNewsInputDTO {
    @IsNotEmpty({ message: 'Title is required' })
    @IsString({ message: 'Title must be a string' })
    title: string;

    @IsNotEmpty({ message: 'Content is required' })
    @IsString({ message: 'Content must be a string' })
    content: string;

    @IsNotEmpty({ message: 'Publication date is required' })
    publication_date: Date;

    @IsNotEmpty({ message: 'Author ID is required' })
    author_id: number;

    @IsOptional()
    @IsBoolean({ message: 'Featured must be a boolean' })
    featured?: boolean = false;

    @IsOptional()
    @IsString({ message: 'Featured image must be a URL string' })
    featured_image?: string;
}

export class UpdateNewsInputDTO extends CreateNewsInputDTO {
    @IsNotEmpty({ message: 'Title is required' })
    @IsString({ message: 'Title must be a string' })
    title: string;

    @IsNotEmpty({ message: 'Content is required' })
    @IsString({ message: 'Content must be a string' })
    content: string;

    @IsNotEmpty({ message: 'Publication date is required' })
    @IsDate({ message: 'Invalid date format' })
    publication_date: Date;

    @IsNotEmpty({ message: 'Author ID is required' })
    author_id: number;

    @IsOptional()
    @IsBoolean({ message: 'Featured must be a boolean' })
    featured?: boolean = false;

    @IsOptional()
    @IsString({ message: 'Featured image must be a URL string' })
    featured_image?: string;
}

export class NewsOutputDTO {
    public constructor(
        public id: number,
        public title: string,
        public content: string,
        public publication_date: Date,
        public author: MemberOutputDTO,
        public featured: boolean,
        public featured_image?: string,
    ) {}
}