import { IsString, IsInt, IsDateString } from 'class-validator';

export class CreatePeriodoDTO {
  @IsString()
  colaborador: string; 

  @IsString()
  periodoVacaciones: string;
  
  @IsInt()
  diasPeriodoVacaciones: number;

  @IsInt()
  diasLaborablesVacaciones: number; 

  @IsInt()
  diasNoLaborablesVacaciones: number; 
  
  @IsString()
  periodoGozar: string;

  @IsInt()
  diasPeriodoGozar: number;

  @IsInt()
  diasLaborablesGozar: number; 

  @IsInt()
  diasNoLaborablesGozar: number; 
  
  @IsString()
  periodoPlanificados: string;
  
  @IsDateString()
  fechaDesde: string;
  
  @IsDateString()
  fechaHasta: string; 

  @IsInt()
  totalDiasPorGozar: number; 
  
  @IsInt()
  diasLaborablesPlanificados: number; 
  
  @IsInt()
  diasNoLaborablesPlanificados: number;

  @IsString()
  periodoSaldo: string;

  @IsInt()
  totalDiasPorGozarsaldo: number; 

  @IsInt()
  diasLaborablesSaldo: number; 
  
  @IsInt()
  diasNoLaborablesSaldo: number; 
}
