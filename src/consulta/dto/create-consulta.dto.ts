import { IsInt, IsString } from 'class-validator';

export class CreateconsultaDto {

  @IsString()
  periodos: string;
  
  @IsInt()
  saldoDiasPeriodo: number;
  
  @IsInt()
  totalDias: number;
  
  @IsString()
  periodosPlanificadas: string;
  
  @IsInt()
  eneroPlanificada: number;
  
  @IsInt()
  febreroPlanificada: number;
  
  @IsInt()
  marzoPlanificada: number;
  
  @IsInt()
  abrilPlanificada: number;
  
  @IsInt()
  mayoPlanificada: number;
  
  @IsInt()
  junioPlanificada: number;
  
  @IsInt()
  julioPlanificada: number;
  
  @IsInt()
  agostoPlanificada: number;
  
  @IsInt()
  septiembrePlanificada: number;
  
  @IsInt()
  octubrePlanificada: number;
  
  @IsInt()
  noviembrePlanificada: number;
  
  @IsInt()
  diciembrePlanificada: number;
  
  @IsInt()
  totalDiasPlanificado: number;
  
  @IsString()
  periodosGozadas: string;
  
  @IsInt()
  eneroGozadas: number;
  
  @IsInt()
  febreroGozadas: number;
  
  @IsInt()
  marzoGozadas: number;
  
  @IsInt()
  abrilGozadas: number;
  
  @IsInt()
  mayoGozadas: number;
  
  @IsInt()
  junioGozadas: number;
  
  @IsInt()
  julioGozadas: number;
  
  @IsInt()
  agostoGozadas: number;
  
  @IsInt()
  septiembreGozadas: number;
  
  @IsInt()
  octubreGozadas: number;
  
  @IsInt()
  noviembreGozadas: number;
  
  @IsInt()
  diciembreGozadas: number;
  
  @IsInt()
  totalDiasGozados: number;
  
  @IsString()
  periodosVacaciones: string;
  
  @IsInt()
  saldoDiasGozar: number;
  
  @IsInt()
  cumplimientoObjetivo: number;
}