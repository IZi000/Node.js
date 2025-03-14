import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { ConsultaService } from './consulta.service';
import { CreateconsultaDto } from './dto/create-consulta.dto';
import { Consulta } from './consulta.entity';
import { Response } from 'express'; 
import { ReportesService } from 'src/ultis/excel';
import * as bcrypt from 'bcrypt';


@Controller('consulta')
export class ConsultaController {

    constructor(private consultaService: ConsultaService){}

    @Post()
        createUser(@Body() newConsulta: CreateconsultaDto){
        return this.consultaService.createConsulta(newConsulta)
    }
    
    @Get('/hash')
    async hashPassword() {
        const password = 'miPassword123';
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return { original: password, hash: hashedPassword };
    }

    @Get()
        getUsers():Promise<Consulta[]>{
        return this.consultaService.getConsulta();
    }
    
     @Get('/reporte')
            async generarReporte(@Res() res: Response) {
                try {
                    const Consulta = await this.consultaService.getConsulta();
                    await ReportesService.generarExcelConsulta(res , Consulta);
                } catch (error) {
                    console.error('Error al generar el reporte:', error);
                    res.status(500).send('No se pudo generar el reporte');
                }
        }

    
}
