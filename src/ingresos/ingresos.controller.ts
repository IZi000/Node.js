import { Body, Controller, Get, Post, Res} from '@nestjs/common';
import { IngresosService } from './ingresos.service';
import { CreateIngresosDto } from './dto/create-ingresos.dto';
import { Ingresos } from './ingresos.entity';
import { ReportesService } from 'src/ultis/excel';
import { Response } from 'express'; // Asegúrate de importar Response de express


@Controller('ingresos')
export class IngresosController {

    constructor(private ingresosService: IngresosService){}
    
    @Post()
        createUser(@Body() newIngreso: CreateIngresosDto){
            return this.ingresosService.createIngreso(newIngreso)
    }

    @Get()
        getUsers():Promise<Ingresos[]>{
            return this.ingresosService.getIngresos();
    }

    @Get('/reporte')
      async generarReporte(@Res() res: Response) {
        try {
            const ingreso = await this.ingresosService.getIngresos();
          await ReportesService.generarExcelIngresos(res , ingreso);
        } catch (error) {
          console.error('Error al generar el reporte:', error);
          res.status(500).send('No se pudo generar el reporte');
        }
    }
}
