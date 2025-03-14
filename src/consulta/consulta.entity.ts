import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "Consulta" })  
export class Consulta  {
  
  @PrimaryGeneratedColumn()  
  id: number;

  @Column({ type: "varchar", length: 100 })
  periodos: string;

  @Column({ type: "int" })
  saldoDiasPeriodo: number;  

  @Column({ type: "int" })
  totalDias: number;  

  @Column({ type: "varchar", length: 100 })
  periodosPlanificadas: string;

  @Column({ type: "int" })
  eneroPlanificada: number;  

  @Column({ type: "int" })
  febreroPlanificada: number;  

  @Column({ type: "int" })
  marzoPlanificada: number;  

  @Column({ type: "int" })
  abrilPlanificada: number;  

  @Column({ type: "int" })
  mayoPlanificada: number; 

  @Column({ type: "int" })
  junioPlanificada: number;  

  @Column({ type: "int" })
  julioPlanificada: number;  

  @Column({ type: "int" })
  agostoPlanificada: number;  

  @Column({ type: "int" })
  septiembrePlanificada: number;  

  @Column({ type: "int" })
  octubrePlanificada: number;  

  @Column({ type: "int" })
  noviembrePlanificada: number;  

  @Column({ type: "int" })
  diciembrePlanificada: number;  

  @Column({ type: "int" })
  totalDiasPlanificado: number; 

  @Column({ type: "varchar", length: 100 })
  periodosGozadas: string;

  @Column({ type: "int" })
  eneroGozadas: number;  

  @Column({ type: "int" })
  febreroGozadas: number;  

  @Column({ type: "int" })
  marzoGozadas: number;  

  @Column({ type: "int" })
  abrilGozadas: number; 

  @Column({ type: "int" })
  mayoGozadas: number;  

  @Column({ type: "int" })
  junioGozadas: number;  

  @Column({ type: "int" })
  julioGozadas: number; 

  @Column({ type: "int" })
  agostoGozadas: number;  

  @Column({ type: "int" })
  septiembreGozadas: number;  

  @Column({ type: "int" })
  octubreGozadas: number;  

  @Column({ type: "int" })
  noviembreGozadas: number; 

  @Column({ type: "int" })
  diciembreGozadas: number;  

  @Column({ type: "int" })
  totalDiasGozados: number;  

  @Column({ type: "varchar", length: 100 })
  periodosVacaciones: string;

  @Column({ type: "int" })
  saldoDiasGozar: number;   

  @Column({ type: "int" })
  cumplimientoObjetivo: number;   
}