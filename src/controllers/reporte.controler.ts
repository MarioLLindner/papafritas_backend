import {
  Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Patch, Post, Put, Res, UseGuards, Query
} from '@nestjs/common';
import ReporteDto from 'src/models/reporte.dto';
import ReporteCompraDto from 'src/models/reporteCompra.dto';
import { ReportesServices } from 'src/services/reportes.service';


@Controller('/api/reportes')

export class ReportesControler {
  constructor(private readonly ReportesServices: ReportesServices) { }

  @Get()
  async getAllReportes(): Promise<ReporteDto[]> {
    return await this.ReportesServices.getAllReportes();
  }

  @Post()
  async crearReporte(@Body() body: ReporteDto): Promise<ReporteDto> {
    return await this.ReportesServices.crearReporte(body);
  }

  @Post()
  async añadirReporteCompra(@Body() body: ReporteCompraDto): Promise<ReporteCompraDto> {
    return await this.ReportesServices.añadirReporteCompra(body);
  }

  @Get()
  async getReporteCompra(@Query('idReporte') idReporte: number): Promise<ReporteCompraDto[]> {
    return await this.ReportesServices.getReporteCompra(idReporte);
  }




}