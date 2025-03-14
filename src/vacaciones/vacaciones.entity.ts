import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "Vacaciones" })  
export class Vacaciones {
  
  @PrimaryGeneratedColumn()  
  id: number;

  @Column({ type: "varchar", length: 100 })
  periodos: string;

  @Column({ type: "int" })
  diasPeriodo: number;  

  @Column({ type: "int" })
  diasLaborables: number;  

  @Column({ type: "int" })
  diasNoLaborables: number; 

  @Column({ type: "int" })
  totalDias: number;  

  @Column({ type: "varchar", length: 100 })
  periodosPlanificados: string; 

  @Column({ type: "date" })
  fechaInicio: Date;  

  @Column({ type: "date" })
  fechaFin: Date;  

  @Column({ type: "int" })
  diasLaborablesIncluidos: number;  

  @Column({ type: "int" })
  diasNoLaborablesIncluidos: number;  

  @Column({ type: "int" })
  totalDiasPlanificados: number;  

  @Column({ type: "int" })
  saldoDiasPlanificados: number;  

  @Column({ type: "varchar", length: 100 })
  periodoGozados: string;  

  @Column({ type: "date" })
  fechaInicioGozados: Date;  

  @Column({ type: "date" })
  fechaFinGozados: Date;  

  @Column({ type: "int" })
  diasLaborablesGozadosIncluidos: number;  

  @Column({ type: "int" })
  diasNoLaborablesGozadosIncluidos: number;  

  @Column({ type: "int" })
  totalDiasGozados: number;  

  @Column({ type: "int" })
  diasLaborablesGozados: number;  

  @Column({ type: "int" })
  diasNoLaborablesGozados: number; 

  @Column({ type: "int" })
  saldoDiasVacacionesPorGozar: number;  

  @Column({ type: "int" })
  diasNoLaboralesNoIncluidos: number;  
}