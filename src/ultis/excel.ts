import * as ExcelJS from 'exceljs';
import { Response } from 'express';
import { User } from '../users/users.entity';  
import { Ingresos } from '../ingresos/ingresos.entity';  
import { Periodos } from 'src/periodos/periodos.entity';
import { Vacaciones } from 'src/vacaciones/vacaciones.entity';
import { Consulta } from 'src/consulta/consulta.entity';
export class ReportesService {

  static async generarExcel(res: Response, users: User[]) {
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'Me';
    workbook.created = new Date();

    const worksheet = workbook.addWorksheet('Datos');

    worksheet.columns = [
      { header: 'Id', key: 'id', width: 10 },
      { header: 'Username', key: 'username', width: 30 },
      { header: 'Password', key: 'password', width: 30 },
      { header: 'CreatedAt', key: 'createdAt', width: 30 },
      { header: 'AuthStrategy', key: 'authStrategy', width: 30 },
    ];

    users.forEach(user => {
      worksheet.addRow({
        id: user.id,
        username: user.username,
        password: user.password,
        createdAt: user.createdAt,
        authStrategy: user.authStrategy,
      });
    });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=datos.xlsx');

    await workbook.xlsx.write(res);
    res.end();
  }

  static async generarExcelIngresos(res: Response, ingresos: Ingresos[]) {
    const workbook = new ExcelJS.Workbook();
workbook.creator = 'Me';
workbook.created = new Date();

const worksheet = workbook.addWorksheet('Ingresos');

worksheet.mergeCells('A1:L1');
const titleCell = worksheet.getCell('A1');
titleCell.value = 'REPORTE PARA MANTENEDOR, ESTE REPORTE SE GENERA LUEGO DE QUE SE INGRESE EL OBJETIVO/RANGO';
titleCell.alignment = { horizontal: 'center', vertical: 'middle' };
worksheet.getRow(1).height = 20;

const headers1 = [
  'CÓDIGO', 'ÁREA', 'RANGO', 'OBJETIVO 2025 (DÍAS A REDUCIR)', 'REGIÓN', 'DEPARTAMENTO',
  'COLABORADOR', 'CARGO', 'JEFE INMEDIATO', 'FECHA DE INGRESO', 'NIVEL', 'CIUDAD'
];

const headers2 = [
  'PERIODO 2017-2018', 'PERIODO 2018-2019', 'TOTAL DÍAS POR PERÍODOS',
  'SALDO DIAS DE VACACIONES A GOZAR DIC/2024', 'OBJETIVO 2025: TOTAL META A CUMPLIR'
];

const headers3 = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];

const headersFinal = [
  'TOTAL DÍAS GOZADOS ACUM ENE-DIC',
  'DIAS PEND PARA CUMPLIR EL INDICADOR',
  'AVANCE'
];

worksheet.addRow([...headers1, ...headers2, ...headers3, ...headersFinal]);

const headerRow = worksheet.getRow(2);
headerRow.eachCell((cell, colNumber) => {
  cell.font = { bold: true, color: { argb: 'FFFFFF' } };
  cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
  cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '003366' } };

  if ([3, 4, headers1.length + 2, headers1.length + 3].includes(colNumber)) {
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '800000' } };
  }
});

headerRow.height = 65;

// Insertar datos con fórmulas automáticas
ingresos.forEach((ingreso, index) => {
  const rowNumber = index + 3; // Empieza en la fila 3 (después de los headers)
  const periodo2017_2018Col = headers1.length + 1;
  const periodo2018_2019Col = headers1.length + 2;
  const totalDiasPorPeriodosCol = headers1.length + 3;
  const eneroCol = totalDiasPorPeriodosCol + 3;
  const diciembreCol = eneroCol + 11;
  const totalDiasGozadosCol = diciembreCol + 1;

  const rowData = [
    ingreso.codigo,
    ingreso.area,
    ingreso.rango,
    ingreso.objetivo2025,
    ingreso.region,
    ingreso.departamento,
    ingreso.colaborador,
    ingreso.cargo,
    ingreso.jefeInmediato,
    ingreso.fechaIngreso,
    ingreso.nivel,
    ingreso.ciudad,
    ingreso.periodo2017_2018,
    ingreso.periodo2018_2019,
    null, // Aquí irá la fórmula de TOTAL DÍAS POR PERÍODOS
    ingreso.saldoDiasVacaciones,
    ingreso.objetivo2025Meta,
    ingreso.enero,
    ingreso.febrero,
    ingreso.marzo,
    ingreso.abril,
    ingreso.mayo,
    ingreso.junio,
    ingreso.julio,
    ingreso.agosto,
    ingreso.septiembre,
    ingreso.octubre,
    ingreso.noviembre,
    ingreso.diciembre,
    null, // Aquí irá la fórmula de TOTAL DÍAS GOZADOS ACUM ENE-DIC
    ingreso.diasPendientesParaCumplir,
    ingreso.avance
  ];

  worksheet.addRow(rowData);

  const row = worksheet.getRow(rowNumber);
  
  // Fórmula para TOTAL DÍAS POR PERÍODOS
  row.getCell(totalDiasPorPeriodosCol).value = { formula: `SUM(${worksheet.getColumn(periodo2017_2018Col).letter}${rowNumber}, ${worksheet.getColumn(periodo2018_2019Col).letter}${rowNumber})` };

  // Fórmula para TOTAL DÍAS GOZADOS ACUM ENE-DIC
  row.getCell(totalDiasGozadosCol).value = { formula: `SUM(${worksheet.getColumn(eneroCol).letter}${rowNumber}:${worksheet.getColumn(diciembreCol).letter}${rowNumber})` };
});

res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
res.setHeader('Content-Disposition', 'attachment; filename=ingresos.xlsx');

await workbook.xlsx.write(res);
res.end();
}

  static async generarExcelPeriodos(res: Response, periodo: Periodos[]) {
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'Me';
    workbook.created = new Date();

    const worksheet = workbook.addWorksheet('Periodos');

    const titleCell = worksheet.getCell('A1');
  titleCell.value = '';
  titleCell.alignment = { horizontal: 'center', vertical: 'middle' };
  worksheet.getRow(1).height = 20;

  worksheet.mergeCells('B1:E1');
  const titleCell2 = worksheet.getCell('B1');
  titleCell2.value = 'PERIODOS DE VACACIONES';
  titleCell2.alignment = { horizontal: 'center', vertical: 'middle' };
  titleCell2.font = { bold: true, size: 14, color: { argb: 'FFFFFF' } };
  titleCell2.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '003366' } };

  worksheet.mergeCells('F1:I1');
  const titleCell3 = worksheet.getCell('F1');
  titleCell3.value = 'SALDO DIAS POR GOZAR';
  titleCell3.alignment = { horizontal: 'center', vertical: 'middle' };
  titleCell3.font = { bold: true, size: 14, color: { argb: 'FFFFFF' } };
  titleCell3.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFA500' } };

  worksheet.mergeCells('J1:O1');
  const titleCell4 = worksheet.getCell('J1');
  titleCell4.value = 'DIAS DE VACACIONES SOLICITADOS PLANIFICADOS';
  titleCell4.alignment = { horizontal: 'center', vertical: 'middle' };
  titleCell4.font = { bold: true, size: 14, color: { argb: 'FFFFFF' } };
  titleCell4.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFC0CB' } };

  worksheet.mergeCells('P1:S1');
  const titleCell5 = worksheet.getCell('P1');
  titleCell5.value = 'SALDO DE VACACIONES DESPUES DE LA PLANIFICACION';
  titleCell5.alignment = { horizontal: 'center', vertical: 'middle' };
  titleCell5.font = { bold: true, size: 14, color: { argb: 'FFFFFF' } };
  titleCell5.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFF00' } };

  const headers1 = ['COLABORADOR'];

  const headers2 = ['PERIODOS', 'DIAS PERIODOS', 'DIAS LABORABLES', 'DIAS NO LABORABLES'];
  const headers3 = ['PERIODOS', 'DIAS PERIODOS', 'DIAS LABORABLES', 'DIAS NO LABORABLES'];

  const headers4 = ['PERIODOS', 'FECHA DESDE', 'FECHA HASTA', 'TOTAL DE DIAS POR GOZAR','DIAS LABORABLES','DIAS NO LABORABLES'];

  const headersultimo = ['PERIODOS', 'TOTAL DE DIAS POR GOZAR','DIAS LABORABLES','DIAS NO LABORABLES'];

  worksheet.addRow([...headers1, ...headers2, ...headers3, ...headers4, ...headersultimo]);
  
  const headerRow = worksheet.getRow(2);

headerRow.eachCell((cell, colNumber) => {
  cell.font = { bold: true, color: { argb: '000000' } };
  cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
  cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFFF' } };
  cell.border = {
    top: { style: 'thin', color: { argb: '000000' } },
    left: { style: 'thin', color: { argb: '000000' } },
    bottom: { style: 'thin', color: { argb: '000000' } },
    right: { style: 'thin', color: { argb: '000000' } }
  };

  const colorSettings = {
    2: '003366', 3: '003366', 4: '003366', 5: '003366',  // Color para columnas 2-5
    6: 'FFA500', 7: 'FFA500', 8: 'FFA500', 9: 'FFA500',  // Color para columnas 6-9
    10: 'FFC0CB', 11: 'FFC0CB', 12: 'FFC0CB', 13: 'FFC0CB', 14: 'FFC0CB', 15: 'FFC0CB', // Color para columnas 10-15
    16: 'FFFF00', 17: 'FFFF00', 18: 'FFFF00', 19: 'FFFF00' // Color para columnas 16-19
  };

  if (colorSettings[colNumber]) {
    cell.font = { bold: true, color: { argb: 'FFFFFF' } };
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: colorSettings[colNumber] } };
  }
});

headerRow.height = 50;

  //Insertar datos
  worksheet.addRows(
    periodo.map(periodo => [
      periodo.colaborador,
      periodo.periodoVacaciones,
      periodo.diasPeriodoVacaciones,
      periodo.diasPeriodoVacaciones,
      periodo.diasNoLaborablesVacaciones,
      periodo.periodoGozar,
      periodo.diasPeriodoGozar,
      periodo.diasLaborablesGozar,
      periodo.diasNoLaborablesGozar,
      periodo.periodoPlanificados,
      periodo.fechaDesde,
      periodo.fechaHasta,
      periodo.totalDiasPorGozar,
      periodo.diasLaborablesPlanificados,
      periodo.diasNoLaborablesPlanificados,
      periodo.periodoSaldo,
      periodo.totalDiasPorGozar,
      periodo.diasLaborablesSaldo,
      periodo.diasNoLaborablesSaldo,
    ])
  );


  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=ingresos.xlsx');

    await workbook.xlsx.write(res);
    res.end();

  }

  static async generarExcelVacaciones(res: Response, vacaciones: Vacaciones[]) {
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'Me';
    workbook.created = new Date();

    const worksheet = workbook.addWorksheet('vacaciones');

    const sections = [
      { celda: 'D4:G4', title: 'PERIODOS DE VACACIONES', color: '003366' },
      { celda: 'H4', title: 'O', color: '003366' },
      { celda: 'I4:O4', title: 'VACACIONES PLANIFICADAS', color: 'FF77DD77' },
      { celda: 'P4:U4', title: 'VACACIONES GOZADAS (SAP)', color: 'FFD3D3D3' },
      { celda: 'V4:X4', title: 'DÍAS PENDIENTES DE VACACIONES POR GOZAR', color: 'FFFFDAB9' }
  ];

  sections.forEach(({ celda, title, color }) => {
      worksheet.mergeCells(celda);
      const titleCell = worksheet.getCell(celda.split(':')[0]);
      titleCell.value = title;
      titleCell.alignment = { 
          horizontal: 'center', vertical: 'middle',wrapText: true 
      };
      titleCell.font = { bold: true, size: 14, color: { argb: 'FFFFFF' } };
      titleCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: color } };

      titleCell.border = {
          top: { style: 'thin', color: { argb: '000000' } },
          left: { style: 'thin', color: { argb: '000000' } },
          bottom: { style: 'thin', color: { argb: '000000' } },
          right: { style: 'thin', color: { argb: '000000' } }
      };
  });

  const headers = [
      null, null, null, 
      'PERIODOS', 'DÍAS PERIODO', 'DÍAS LABORABLES', 'DÍAS NO LABORABLES', 'TOTAL DÍAS',
      'PERIODOS', 'FECHA INICIO', 'FECHA FIN', 'DÍAS LABORABLES INCLUIDOS', 'DÍAS NO LABORABLES INCLUIDOS', 'TOTAL DÍAS PLANIFICADOS', 'SALDO DÍAS PLANIFICADOS',
      'PERIODO', 'FECHA INICIO', 'FECHA FIN', 'DÍAS LABORABLES INCLUIDOS', 'DÍAS NO LABORABLES INCLUIDOS', 'TOTAL DÍAS GOZADOS',
      'DÍAS LABORABLES', 'DÍAS NO LABORABLES', 'SALDO DÍAS VACACIONES POR GOZAR',
      'DIAS NO LABORALES NO INCLUIDOS EN EL PERIODO'
  ];

  worksheet.getRow(4).height = 50;
  worksheet.getRow(5).height = 20;
  
  const headerRow = worksheet.addRow(headers);
  headerRow.eachCell((cell, colNumber) => {
      if (colNumber >= 4) { 
          cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText:true };
          cell.font = { bold: true };

          cell.border = {
              top: { style: 'thin', color: { argb: '000000' } },
              left: { style: 'thin', color: { argb: '000000' } },
              bottom: { style: 'thin', color: { argb: '000000' } },
              right: { style: 'thin', color: { argb: '000000' } }
          };
      }
  });

const addedRows = worksheet.addRows(
  vacaciones.map(vacacion => [
      null, null, null, 
      vacacion.periodos,
      vacacion.diasPeriodo,
      vacacion.diasLaborables,
      vacacion.diasNoLaborables,
      vacacion.totalDias,
      vacacion.periodosPlanificados,
      vacacion.fechaInicio,
      vacacion.fechaFin,
      vacacion.diasLaborablesIncluidos,
      vacacion.diasNoLaborablesIncluidos,
      vacacion.totalDiasPlanificados,
      vacacion.saldoDiasPlanificados,
      vacacion.periodoGozados,
      vacacion.fechaInicioGozados,
      vacacion.fechaFinGozados,
      vacacion.diasLaborablesGozadosIncluidos,
      vacacion.diasNoLaborablesGozadosIncluidos,
      vacacion.totalDiasGozados,
      vacacion.diasLaborablesGozados,
      vacacion.diasNoLaborablesGozados,
      vacacion.saldoDiasVacacionesPorGozar,
      vacacion.diasNoLaboralesNoIncluidos,
  ])
);

addedRows.forEach(row => {
  row.eachCell((cell, colNumber) => {
      cell.border = {
          top: { style: 'thin', color: { argb: '000000' } },
          left: { style: 'thin', color: { argb: '000000' } },
          bottom: { style: 'thin', color: { argb: '000000' } },
          right: { style: 'thin', color: { argb: '000000' } }
      };
  });
});


      const uniones = [
        { rango: 'H6:H13', cell: 'H6' },
        { rango: 'D6:D12', cell: 'D6' },
        { rango: 'E6:E12', cell: 'E6' },
        { rango: 'F6:F12', cell: 'F6' },
        { rango: 'G6:G12', cell: 'G6' },
        { rango: 'V6:V12', cell: 'V6' },
        { rango: 'W6:W12', cell: 'W6' },
        { rango: 'X6:X12', cell: 'X6' },
        { rango: 'Y6:Y12', cell: 'Y6' }
    ];

    uniones.forEach(({ rango, cell }) => {
        worksheet.mergeCells(rango);
        worksheet.getCell(cell).alignment = { horizontal: 'center', vertical: 'middle' };
    });

    worksheet.columns.forEach((column, index) => {
        if (index >= 3) { 
            column.width = 15;
        }
    });

  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', 'attachment; filename=ingresos.xlsx');

  await workbook.xlsx.write(res);
  res.end();

  }

  static async generarExcelConsulta(res: Response, consulta: Consulta[]) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('CONSULTA CONSOLIDADA');

    worksheet.mergeCells('D3:AK3');
    worksheet.getCell('D3').value = 'VISTA CONSULTA CONSOLIDADA';
    worksheet.getCell('D3').alignment = { horizontal: 'center' };

    worksheet.getCell('D3').font = { 
      bold: true, 
      size: 18, 
      color: { argb: '000000' } 
  };
  
  
  worksheet.getCell('D3').border = {
      top: { style: 'thick', color: { argb: '000000' } },
      left: { style: 'thick', color: { argb: '000000' } },
      bottom: { style: 'thick', color: { argb: '000000' } },
      right: { style: 'thick', color: { argb: '000000' } }
  };


  const sections = [
      { celda: 'D4:E4', title: 'PERIODOS DE VACACIONES', color: '003366' },
      { celda: 'F4', title: 'OBJETIVO', color: 'FF0000' },
      { celda: 'G4:T4', title: 'VACACIONES PLANIFICADAS', color: '90EE90' },
      { celda: 'U4:AH4', title: 'VACACIONES GOZADAS (SAP)', color: 'D3D3D3' },
      { celda: 'AI4:AJ4', title: 'DÍAS PENDIENTES DE VACACIONES POR GOZAR', color: 'FFDAB9' },
      { celda: 'AK4', title: '', color: 'FFFFFF' }
  ];

  sections.forEach(({ celda, title, color }) => {
      worksheet.mergeCells(celda);
      const titleCell = worksheet.getCell(celda.split(':')[0]);
      titleCell.value = title;
      titleCell.alignment = { 
          horizontal: 'center', vertical: 'middle',wrapText: true 
      };
      titleCell.font = { bold: true, size: 14, color: { argb: 'FFFFFF' } };
      titleCell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: color } };

      titleCell.border = {
          top: { style: 'thin', color: { argb: '000000' } },
          left: { style: 'thin', color: { argb: '000000' } },
          bottom: { style: 'thin', color: { argb: '000000' } },
          right: { style: 'thin', color: { argb: '000000' } }
      };
  });

  const headers = [
    null, null, null, 
    'PERIODOS', 'SALDO DIAS POR PERIODO', 'TOTAL DIAS', 'PERIODOS',
    'ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL','AGO', 'SEP', 'OCT', 'NOV', 'DIC','TOTAL DIAS PLANIFICADOS', 'PERIODOS',
    'ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL','AGO', 'SEP', 'OCT', 'NOV', 'DIC','TOTAL DIAS GOZADOS',
    'PERIODO','SALDO DIAS VACACIONES POR GOZAR','CUMPLIMIENTO OBJETIVO'
  ];

  worksheet.getRow(4).height = 50;
    
  const headerRow = worksheet.addRow(headers);
  headerRow.eachCell((cell, colNumber) => {
      if (colNumber >= 4) { 
          cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText:true };
          cell.font = { bold: true };

          cell.border = {
              top: { style: 'thin', color: { argb: '000000' } },
              left: { style: 'thin', color: { argb: '000000' } },
              bottom: { style: 'thin', color: { argb: '000000' } },
              right: { style: 'thin', color: { argb: '000000' } }
          };
      }
  });

  const addedRows = worksheet.addRows(
    consulta.map(consulta => [
        null, null, null, 
        consulta.periodos,
        consulta.saldoDiasPeriodo,
        consulta.totalDias,
        consulta.periodosPlanificadas,
        consulta.eneroPlanificada,
        consulta.febreroPlanificada,
        consulta.marzoPlanificada,
        consulta.abrilPlanificada,
        consulta.mayoPlanificada,
        consulta.junioPlanificada,
        consulta.julioPlanificada,
        consulta.agostoPlanificada,
        consulta.septiembrePlanificada,
        consulta.octubrePlanificada,
        consulta.noviembrePlanificada,
        consulta.diciembrePlanificada,
        consulta.totalDiasPlanificado,
        consulta.periodosGozadas,
        consulta.eneroGozadas,
        consulta.febreroGozadas,
        consulta.marzoGozadas,
        consulta.abrilGozadas,
        consulta.mayoGozadas,
        consulta.junioGozadas,
        consulta.julioGozadas,
        consulta.agostoGozadas,
        consulta.septiembreGozadas,
        consulta.octubreGozadas,
        consulta.noviembreGozadas,
        consulta.diciembreGozadas,
        consulta.totalDiasGozados,
        consulta.periodosVacaciones,
        consulta.saldoDiasGozar,
        consulta.cumplimientoObjetivo,
    ])
  );

  addedRows.forEach(row => {
    row.eachCell((cell) => {
        cell.border = {
            top: { style: 'thin', color: { argb: '000000' } },
            left: { style: 'thin', color: { argb: '000000' } },
            bottom: { style: 'thin', color: { argb: '000000' } },
            right: { style: 'thin', color: { argb: '000000' } }
        };
    });
  });
//
  const lastRow = worksheet.rowCount + 1; 

  worksheet.getCell(`D${lastRow}`).value = 'TOTAL';
  worksheet.getCell(`D${lastRow}`).font = { bold: true };
  worksheet.getCell(`D${lastRow}`).alignment = { horizontal: 'center', vertical: 'middle' };
11  
  worksheet.getCell(`E${lastRow}`).value = { formula: `SUM(E6:E${lastRow - 1})` };
  worksheet.getCell(`T${lastRow}`).value = { formula: `SUM(T6:T${lastRow - 1})` };
  worksheet.getCell(`AH${lastRow}`).value = { formula: `SUM(AH6:AH${lastRow - 1})` };
  worksheet.getCell(`AJ${lastRow}`).value = { formula: `SUM(AJ6:AJ${lastRow - 1})` };

  ['E', 'T', 'AH', 'AJ'].forEach(col => {
      worksheet.getCell(`${col}${lastRow}`).font = { bold: true };
      worksheet.getCell(`${col}${lastRow}`).alignment = { horizontal: 'center', vertical: 'middle' };
  });

  ['D', 'E', 'T', 'AH', 'AJ'].forEach(col => {
      worksheet.getCell(`${col}${lastRow}`).border = {
          top: { style: 'thin', color: { argb: '000000' } },
          left: { style: 'thin', color: { argb: '000000' } },
          bottom: { style: 'thin', color: { argb: '000000' } },
          right: { style: 'thin', color: { argb: '000000' } }
      };
  });


  const buffer = await workbook.xlsx.writeBuffer();
  const excelBase64 = Buffer.from(buffer).toString('base64');

  res.send({ base64: excelBase64 });
  res.end();

  }
}
