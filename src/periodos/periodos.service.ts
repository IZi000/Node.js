import { Injectable } from '@nestjs/common';
import { Periodos } from './periodos.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePeriodoDTO } from './dto/create-periodos.dto';

@Injectable()
export class PeriodosService {

     constructor(
                @InjectRepository(Periodos) private periodosRepository: Repository<Periodos> ,
            ){}

    async createPeriodo(periodo:CreatePeriodoDTO){
        const nuevoPeriodo = this.periodosRepository.create(periodo)
        return this.periodosRepository.save(nuevoPeriodo)
    }

    getPeriodos (){
        return this.periodosRepository.find()
    }

    

}
