import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Consulta } from './consulta.entity';
import { CreateconsultaDto } from './dto/create-consulta.dto';

@Injectable()
export class ConsultaService {
    constructor(
            @InjectRepository(Consulta) private consultaRepository: Repository<Consulta> ,
         ){}

     async createConsulta(consulta:CreateconsultaDto){
                 const nuevaconsulta = this.consultaRepository.create(consulta)
                 return this.consultaRepository.save(nuevaconsulta)
        }
    
        getConsulta(){
            return this.consultaRepository.find()
        }     
}
