import { Module } from '@nestjs/common';
import { VacacionesController } from './vacaciones.controller';
import { VacacionesService } from './vacaciones.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vacaciones } from './vacaciones.entity';

@Module({
    imports:[TypeOrmModule.forFeature([
        Vacaciones
    ])
    ],
    providers: [VacacionesService],
    controllers: [VacacionesController]
})
export class VacacionesModule {}
