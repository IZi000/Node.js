import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vacaciones } from './vacaciones.entity';
import { CreateVacacionesDto } from './dto/create-vacaciones.dto';

@Injectable()
export class VacacionesService {

      constructor(
                    @InjectRepository(Vacaciones) private vacacionesRepository: Repository<Vacaciones> ,
     ){}

    async createVacaciones(vacaciones:CreateVacacionesDto){
             const nuevovacaciones = this.vacacionesRepository.create(vacaciones)
             return this.vacacionesRepository.save(nuevovacaciones)
    }

    getVacaciones (){
        return this.vacacionesRepository.find()
    }

}
