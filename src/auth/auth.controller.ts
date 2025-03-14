import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService){

    }
    @Post('register')
    register(@Body() registerDto: RegisterDto) {
        console.log(registerDto);
        return this.authService.register(registerDto);
    }

    @Post('login')
    login(@Body() loginDto: LoginDto){
        return this.authService.login(loginDto)
    }

    @Get("perfil")
    @UseGuards(AuthGuard)
    perfil(
        @Request()
        req
    ){
        return req.user;
    }

    @Get('/hash')
    async hashPassword() {
        const password = 'miPassword123';
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return { original: password, hash: hashedPassword };
    }
    
}
