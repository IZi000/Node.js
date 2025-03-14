import { Transform } from "class-transformer";
import { IsEmail, IsEmpty, IsString, MinLength } from "class-validator";

export class RegisterDto{
    @Transform(({value}) => value.trim())
    @IsString()
    username: string;

    @IsEmail()
    email: string;

    @Transform(({value}) => value.trim())
    @IsString()
    @MinLength(6)
    password: string;
}