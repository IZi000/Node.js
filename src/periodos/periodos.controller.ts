import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { PeriodosService } from './periodos.service';
import { CreatePeriodoDTO } from './dto/create-periodos.dto';
import { Periodos } from './periodos.entity';
import { Response } from 'express'; 
import { ReportesService } from 'src/ultis/excel';

@Controller('periodos')
export class PeriodosController {

    constructor(private periodosService: PeriodosService){}

    @Post()
        createUser(@Body() newIngreso: CreatePeriodoDTO){
        return this.periodosService.createPeriodo(newIngreso)
    }
    
    @Get()
        getUsers():Promise<Periodos[]>{
        return this.periodosService.getPeriodos();
    }

    @Get('/reporte')
        async generarReporte(@Res() res: Response) {
            try {
                const Periodos = await this.periodosService.getPeriodos();
              await ReportesService.generarExcelPeriodos(res , Periodos);
            } catch (error) {
              console.error('Error al generar el reporte:', error);
              res.status(500).send('No se pudo generar el reporte');
            }
    }
}
