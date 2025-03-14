import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Res } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { updateUserDto } from './dto/update-user-dto';
import { CreateProfileDto } from './dto/create-profile.dto';
import { ReportesService } from '../ultis/excel';
import * as ExcelJS from 'exceljs';

import { Response } from 'express';


@Controller('users')
export class UsersController {

    constructor(private userService: UsersService){

    }
    @Post()
    createUser(@Body() newUser: CreateUserDto){
        return this.userService.createUser(newUser)
    }
    
    @Get()
    getUsers():Promise<User[]>{
        return this.userService.getUsers();
    }

    //necesito hacer la conversion de dato porque me sale que es string

    @Get('/reporte')
  async generarReporte(@Res() res: Response) {
    try {
        const user = await this.userService.getUsers();
      await ReportesService.generarExcel(res , user);
    } catch (error) {
      console.error('Error al generar el reporte:', error);
      res.status(500).send('No se pudo generar el reporte');
    }
  }

    @Get(':id')
    getUser (@Param('id', ParseIntPipe) id: number) {
        console.log(id)
        console.log(typeof id)
        return this.userService.getUser(id);
    }

    @Delete(':id')
    deleteUSer(@Param('id', ParseIntPipe) id: number){
        return this.userService.deleteUser(id)
    }

    @Patch(':id')
    updateUser (@Param('id', ParseIntPipe) id: number , @Body() user : updateUserDto){
        return this.userService.updateUser(id,user)
    }    

    @Post(':id/profile')
    createProfile(
        @Param('id', ParseIntPipe) id: number,
        @Body() profile: CreateProfileDto
    ) {
        return this.userService.createProfile(id, profile);
    }

    


    }