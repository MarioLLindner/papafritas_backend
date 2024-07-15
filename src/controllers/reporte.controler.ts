import {
  Body, Controller, Get, Post
} from '@nestjs/common';
import ReporteDto from 'src/models/reporte.dto';
import ReporteCompraDto from 'src/models/reporteCompra.dto';
import { ReportesServices } from 'src/services/reportes.service';


@Controller('/api/reporte')

export class ReportesControler {
  constructor(private readonly ReportesServices: ReportesServices) { }

  @Get()
  async getAllReportes(): Promise<ReporteDto[]> {
    return await this.ReportesServices.getAllReportes();
  }

  @Post()
  async crearReporte(@Body() body: ReporteDto): Promise<ReporteDto> {
    console.log('BODY REPORTE', body)
    return await this.ReportesServices.crearReporte(body);
  }

  @Get('count')
  async countReportes(): Promise<number> {
    return await this.ReportesServices.countReportes()
  }

  @Post('compra')
  async añadirReporteCompra(@Body() body: ReporteCompraDto[]): Promise<ReporteCompraDto[]> {
    console.log('BODY REPORTE ReporteCompraDto:', body)
    return await this.ReportesServices.postReporteCompra(body);
  }

  @Post('compras')
  async getReporteCompra(@Body() body: { idReporte: number }): Promise<ReporteCompraDto[]> {
    console.log('BODY REPORTE ReporteCompraDto :', body);
    const rta = await this.ReportesServices.getReporteCompra(body.idReporte);
    console.log('RESPUESTA:', rta);
    return rta;
  }


}