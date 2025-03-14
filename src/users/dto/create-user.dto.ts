import { IsNotEmpty, IsString } from "class-validator"
 
export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    username?: string;
    @IsString()
    @IsNotEmpty()
    password: string;

    email: string

}
//class validtor colocarlo en mis dto 
