import { Module } from '@nestjs/common';
import { IngresosService } from './ingresos.service';
import { IngresosController } from './ingresos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ingresos } from './ingresos.entity';

@Module({
  imports:[TypeOrmModule.forFeature([
    Ingresos
  ])
],
  providers: [IngresosService],
  controllers: [IngresosController]
})
export class IngresosModule {}
