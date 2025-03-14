import { IsString, IsInt, IsDate, IsOptional } from 'class-validator';

export class CreateVacacionesDto {
  
  @IsString()
  periodos: string;

  @IsInt()
  diasPeriodo: number;

  @IsInt()
  diasLaborables: number;

  @IsInt()
  diasNoLaborables: number;

  @IsInt()
  totalDias: number;

  @IsString()
  periodosPlanificados: string;

  @IsDate()
  fechaInicio: Date;

  @IsDate()
  fechaFin: Date;

  @IsInt()
  diasLaborablesIncluidos: number;

  @IsInt()
  diasNoLaborablesIncluidos: number;

  @IsInt()
  totalDiasPlanificados: number;

  @IsInt()
  saldoDiasPlanificados: number;

  @IsString()
  periodoGozados: string;

  @IsDate()
  fechaInicioGozados: Date;

  @IsDate()
  fechaFinGozados: Date;

  @IsInt()
  diasLaborablesGozadosIncluidos: number;

  @IsInt()
  diasNoLaborablesGozadosIncluidos: number;

  @IsInt()
  totalDiasGozados: number;

  @IsInt()
  diasLaborablesGozados: number;

  @IsInt()
  diasNoLaborablesGozados: number;

  @IsInt()
  saldoDiasVacacionesPorGozar: number;

  @IsInt()
  diasNoLaboralesNoIncluidos: number;
}