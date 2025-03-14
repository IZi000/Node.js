import { Module } from '@nestjs/common';
import { PeriodosController } from './periodos.controller';
import { PeriodosService } from './periodos.service';
import { Periodos } from './periodos.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([
      Periodos
    ])
  ],
  controllers: [PeriodosController],
  providers: [PeriodosService]
})
export class PeriodosModule {}
