import { Module } from '@nestjs/common';
import { ConsultaService } from './consulta.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Consulta } from './consulta.entity';
import { ConsultaController } from './consulta.controller';

@Module({
  imports:[TypeOrmModule.forFeature([
          Consulta
      ])
      ],
  providers: [ConsultaService],
  controllers: [ConsultaController]
  
})
export class ConsultaModule {}
