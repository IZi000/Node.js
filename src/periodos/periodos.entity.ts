import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:"Periodos"})
export class Periodos {
  @PrimaryGeneratedColumn()
  id: number; 

  @Column({ type: "varchar", length: 255 })
  colaborador: string; 

  @Column({ type: "varchar", length: 255 })
  periodoVacaciones: string;
  
  @Column({ type: "int" })
  diasPeriodoVacaciones: number;

  @Column({ type: "int" })
  diasLaborablesVacaciones: number;

  @Column({ type: "int" })
  diasNoLaborablesVacaciones: number; 
  
  @Column({ type: "varchar", length: 255 })
  periodoGozar: string; // Nombre del segundo período
  
  @Column({ type: "int" })
  diasPeriodoGozar: number; // Días del segundo período

  @Column({ type: "int" })
  diasLaborablesGozar: number; // Días laborables del segundo período
  
  @Column({ type: "int" })
  diasNoLaborablesGozar: number; // Días no laborables del segundo período
  
  @Column({ type: "varchar", length: 255 })
  periodoPlanificados: string; // Nombre del tercer período
  
  @Column({ type: "date" })
  fechaDesde: string;
  
  @Column({ type: "date" })
  fechaHasta: string; 

  @Column({ type: "int" })
  totalDiasPorGozar: number; 
  
  @Column({ type: "int" })
  diasLaborablesPlanificados: number; 
  
  @Column({ type: "int" })
  diasNoLaborablesPlanificados: number;

  @Column({ type: "varchar", length: 255 })
  periodoSaldo: string;

  @Column({ type: "int" })
  totalDiasPorGozarsaldo: number; 

  @Column({ type: "int" })
  diasLaborablesSaldo: number; 
  
  @Column({ type: "int" })
  diasNoLaborablesSaldo: number; 
}
