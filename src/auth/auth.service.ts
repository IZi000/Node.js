import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService 
    ){}

    async register({username, email,password}: RegisterDto){
        
        const user = await this.usersService.findOneByEmail(email);

        if(user){
            throw new BadRequestException("El usuario ya existe     ")
        }

        return await this.usersService.createUser({username, 
            email,
            password: await bcrypt.hash(password,10)
        });
    }
    /*
    async login2(loginDto: LoginDto){
        const user = await this.usersService.findOneByEmail(loginDto.email);
        if (!user){
            throw new UnauthorizedException("email esta equivocado no existe papito lindo mire bien")
        }
        
        const isPasswordvalid = await bcrypt.compare(loginDto.password, user.password);
        if(!isPasswordvalid){
            throw new UnauthorizedException(" contraseña esta equivocado ")
        }
        return user;
    }*/

    async login({email,password}: LoginDto){
        const user = await this.usersService.findOneByEmail(email);
        if (!user){
            throw new UnauthorizedException("email esta equivocado no existe papito lindo mire bien")
        }
        
        const isPasswordvalid = await bcrypt.compare(password, user.password);
        if(!isPasswordvalid){
            throw new UnauthorizedException(" contraseña esta equivocado")
        }

        const payload = {email: user.email}

        const token = await this.jwtService.signAsync(payload)

        return {
            token,
            email
        };
    }


}
