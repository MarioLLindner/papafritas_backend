import { Injectable } from '@nestjs/common';
import { DatabaseService } from './db.service';
import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import ReporteDto from 'src/models/reporte.dto';
import reportesQueries from './queries/reportes.queries';
import ReporteCompraDto from 'src/models/reporteCompra.dto';


@Injectable()

export class ReportesServices {
  constructor(private dbService: DatabaseService) { }

  async getAllReportes(): Promise<ReporteDto[]> {
    const resultQuery: RowDataPacket[] = await this.dbService.executeSelect(reportesQueries.getAllReportes, []);
    const resultReporte = resultQuery.map((rs: RowDataPacket) => {

      return {
        idReporte: rs['idReporte'],
        idUsuario: rs['idUsuario'],
        fechaReporte: rs['fechaReporte'],
        montoGastado: rs['montoGastado']
      }
    });
    return resultReporte;
  }

  async crearReporte(reporte: ReporteDto): Promise<ReporteDto> {
    const resultQuery: ResultSetHeader = await this.dbService.executeQuery(reportesQueries.crearReporte,
      [reporte.idReporte, reporte.idUsuario, reporte.fechaReporte, reporte.montoGastado]);
    return {
      idReporte: reporte.idReporte,
      idUsuario: reporte.idUsuario,
      fechaReporte: reporte.fechaReporte,
      montoGastado: reporte.montoGastado
    }
  }

  
  async postReporteCompra(reporteCompra: ReporteCompraDto[]): Promise<ReporteCompraDto[]> {
    const results: ReporteCompraDto[] = [];
    for (const compra of reporteCompra) {
      const resultQuery: ResultSetHeader = await this.dbService.executeQuery(reportesQueries.añadirCompras, [
        compra.idCompra, compra.idReporte, compra.idProducto, compra.cantidad, compra.precioUnitario
      ]);
      const compraInsertada: ReporteCompraDto = {
        idCompra: compra.idCompra,
        idReporte: compra.idReporte,
        idProducto: compra.idProducto,
        cantidad: compra.cantidad,
        precioUnitario: compra.precioUnitario
      };
      results.push(compraInsertada);
    }
    return results;
  }

  async getReporteCompra(idReporte: number): Promise<ReporteCompraDto[]> {
    const resultQuery = await this.dbService.executeSelect(reportesQueries.getComprasByReporte, [idReporte]) as RowDataPacket[];
    const resultReporte = resultQuery.map((rs: RowDataPacket) => {
      return {
        idCompra: rs['idcompra'],
        idReporte: rs['idReporte'],
        idProducto: rs['idProducto'],
        cantidad: rs['cantidad'],
        precioUnitario: rs['precioUnitario']
      };
    });
    return resultReporte;
  }

  async countReportes(): Promise<number> {
    const resultQuery: ResultSetHeader = await this.dbService.executeQuery(reportesQueries.reportesCount, [])
    return resultQuery[0].count;
  }
}








