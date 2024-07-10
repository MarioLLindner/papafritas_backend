import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
        fechaReporte: rs['fechaReporte'],//ver este 
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
      fechaReporte: reporte.fechaReporte,//ver este 
      montoGastado: reporte.montoGastado
    }
  }

  async añadirReporteCompra(reporteCompra: ReporteCompraDto): Promise<ReporteCompraDto> {
    const resultQuery: ResultSetHeader = await this.dbService.executeQuery(reportesQueries.añadirCompras, [
      reporteCompra.idCompra, reporteCompra.idReporte, 
      reporteCompra.idProducto, reporteCompra.cantidad, reporteCompra.precioUnitario]);
    return {
      idCompra: reporteCompra.idCompra,
      idReporte: reporteCompra.idReporte,
      idProducto: reporteCompra.idProducto,
      cantidad: reporteCompra.cantidad,
      precioUnitario: reporteCompra.precioUnitario
    }
  }

  async getReporteCompra(idReporte: number): Promise<any> {
    const resultQuery: RowDataPacket[] = await this.dbService.executeSelect(reportesQueries.getComprasByReporte, [idReporte]);
    const resultReporte = resultQuery.map((rs: RowDataPacket) => {
      return {
        idcompra: rs['idcompra'],
        idReporte: rs['idReporte'],
        idProducto: rs['idProducto'],
        cantidad: rs['cantidad'],
        precio: rs['precioUnitario'],
      }
    })
  }







}
