import { Injectable } from '@nestjs/common';
import { Ingresos } from './ingresos.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateIngresosDto } from './dto/create-ingresos.dto';

@Injectable()
export class IngresosService {

    constructor(
            @InjectRepository(Ingresos) private ingresosRepository: Repository<Ingresos> ,
        ){}

    async createIngreso(ingreso:CreateIngresosDto){
           const nuevoIngreso = this.ingresosRepository.create(ingreso)
           return this.ingresosRepository.save(nuevoIngreso)
        }

    getIngresos (){
        return this.ingresosRepository.find()
    }
        
    

}
