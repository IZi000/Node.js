export class CreateIngresosDto {
    codigo: string;  // Código, por ejemplo, "30000438"
    area: string;  // Área, por ejemplo, "TIC"
    rango: string;  // Rango, por ejemplo, "Más de 100 días"
    objetivo2025: string;  // Objetivo 2025 (días a reducir)
    region: string;  // Región, por ejemplo, "GUAYAQUIL"
    departamento: string;  // Departamento, por ejemplo, "RACION DE SER"
    colaborador: string;  // Nombre del colaborador
    cargo: string;  // Cargo del colaborador
    jefeInmediato: string;  // Nombre del jefe inmediato
    fechaIngreso: Date;  // Fecha de ingreso del colaborador
    nivel: string;  // Nivel, por ejemplo "APOYO"
    ciudad: string;  // Ciudad, por ejemplo "GUAYAQUIL"
    periodo2017_2018: number;  // Días de vacaciones 2017-2018
    periodo2018_2019: number;  // Días de vacaciones 2018-2019
    totalDiasPorPeriodos: number;  // Total días por períodos
    saldoDiasVacaciones: number;  // Saldo de días a gozar (Diciembre 2024)
    objetivo2025Meta: number;  // Total meta a cumplir en 2025
    enero: number;  // Días de enero
    febrero: number;  // Días de febrero
    marzo: number;  // Días de marzo
    abril: number;  // Días de abril
    mayo: number;  // Días de mayo
    junio: number;  // Días de junio
    julio: number;  // Días de julio
    agosto: number;  // Días de agosto
    septiembre: number;  // Días de septiembre
    octubre: number;  // Días de octubre
    noviembre: number;  // Días de noviembre
    diciembre: number;  // Días de diciembre
    totalDiasGozadosAcumulados: number;  // Total días gozados de enero a diciembre
    diasPendientesParaCumplir: number;  // Días pendientes para cumplir el indicador
    avance: string;  // Avance, por ejemplo "100%"
  }
  