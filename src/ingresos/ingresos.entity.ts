import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "Ingresos" })  // nombre de la tabla en la base de datos
export class Ingresos {
  
  @PrimaryGeneratedColumn()  // ID auto-generado de la tabla
  id: number;

  @Column({ type: "varchar", length: 10 })
  codigo: string;  // Código, por ejemplo, "30000438"

  @Column({ type: "varchar", length: 100 })
  area: string;  // Área, por ejemplo, "TIC"

  @Column({ type: "varchar", length: 100 })
  rango: string;  // Rango, por ejemplo, "Más de 100 días"

  @Column({ type: "varchar", length: 100 })
  objetivo2025: string;  // Objetivo 2025 (días a reducir)

  @Column({ type: "varchar", length: 100 })
  region: string;  // Región, por ejemplo, "GUAYAQUIL"

  @Column({ type: "varchar", length: 100 })
  departamento: string;  // Departamento, por ejemplo, "RACION DE SER"

  @Column({ type: "varchar", length: 100 })
  colaborador: string;  // Nombre del colaborador

  @Column({ type: "varchar", length: 100 })
  cargo: string;  // Cargo del colaborador

  @Column({ type: "varchar", length: 100 })
  jefeInmediato: string;  // Nombre del jefe inmediato

  @Column({ type: "date" })
  fechaIngreso: Date;  // Fecha de ingreso del colaborador

  @Column({ type: "varchar", length: 50 })
  nivel: string;  // Nivel, por ejemplo "APOYO"

  @Column({ type: "varchar", length: 100 })
  ciudad: string;  // Ciudad, por ejemplo "GUAYAQUIL"

  @Column({ type: "int" })
  periodo2017_2018: number;  // Días de vacaciones 2017-2018

  @Column({ type: "int" })
  periodo2018_2019: number;  // Días de vacaciones 2018-2019

  //aqui estos datos puedo sumarlos y darle un total
  @Column({ type: "int" })
  totalDiasPorPeriodos: number;  // Total días por períodos

  @Column({ type: "int" })
  saldoDiasVacaciones: number;  // Saldo de días a gozar (Diciembre 2024)

  @Column({ type: "int" })
  objetivo2025Meta: number;  // Total meta a cumplir en 2025

  // Columnas de los meses
  @Column({ type: "int" })
  enero: number;

  @Column({ type: "int" })
  febrero: number;

  @Column({ type: "int" })
  marzo: number;

  @Column({ type: "int" })
  abril: number;

  @Column({ type: "int" })
  mayo: number;

  @Column({ type: "int" })
  junio: number;

  @Column({ type: "int" })
  julio: number;

  @Column({ type: "int" })
  agosto: number;

  @Column({ type: "int" })
  septiembre: number;

  @Column({ type: "int" })
  octubre: number;

  @Column({ type: "int" })
  noviembre: number;

  @Column({ type: "int" })
  diciembre: number;

  @Column({ type: "int" })
  totalDiasGozadosAcumulados: number;  // Total días gozados de enero a diciembre

  @Column({ type: "int" })
  diasPendientesParaCumplir: number;  // Días pendientes para cumplir el indicador

  @Column({ type: "varchar", length: 10 })
  avance: string;  // Avance, por ejemplo "100%"
}
