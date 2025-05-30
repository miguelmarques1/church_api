import { RoleCredentials } from "../enum/RoleCredentials"
import { IsNotEmpty, IsString, MinLength, Matches, MaxLength } from 'class-validator';

export class AuthInputDTO {
    @IsNotEmpty({ message: 'Phone number is required' })
    @IsString({ message: 'Phone number must be a string' })
    @Matches(/^[\d\s()+-\-]+$/, {
        message: 'Phone number can only contain digits, spaces, parentheses, hyphens or plus sign'
    })
    @MinLength(10, {
        message: 'Phone number must be at least 10 characters long (after formatting)'
    })
    @MaxLength(25, {
        message: 'Phone number must be at most 25 characters long (after formatting)'
    })
    phone: string;

    @IsNotEmpty({ message: 'Password is required' })
    @IsString({ message: 'Password must be a string' })
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    password: string;
}

export type AuthPayload = {
    id: number,
    role: RoleCredentials,
}

export class AuthOutputDTO {
    public constructor(
        public access_token: string,
    ) {}
}