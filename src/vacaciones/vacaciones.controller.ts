import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { VacacionesService } from './vacaciones.service';
import { CreateVacacionesDto } from './dto/create-vacaciones.dto';
import { Vacaciones } from './vacaciones.entity';
import { Response } from 'express'; 
import { ReportesService } from 'src/ultis/excel';


@Controller('vacaciones')
export class VacacionesController {

    constructor(private vacacionesService: VacacionesService){}
    
    @Post()
        createUser(@Body() newIngreso: CreateVacacionesDto){
        return this.vacacionesService.createVacaciones(newIngreso)
    }
        
    @Get()
        getUsers():Promise<Vacaciones[]>{
        return this.vacacionesService.getVacaciones();
    }
    
    @Get('/reporte')
        async generarReporte(@Res() res: Response) {
            try {
                const Vacaciones = await this.vacacionesService.getVacaciones();
                await ReportesService.generarExcelVacaciones(res , Vacaciones);
            } catch (error) {
                console.error('Error al generar el reporte:', error);
                res.status(500).send('No se pudo generar el reporte');
            }
    }
}
