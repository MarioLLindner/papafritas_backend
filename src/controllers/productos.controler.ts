import {
  Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Patch, Post, Put, Res, UseGuards,
} from '@nestjs/common';
import ProductoDto from 'src/models/producto.dto';
import { productosServices } from 'src/services/productos.service';


@Controller('/api/productos')

export class ProductosControler{
  constructor(private readonly productosService:productosServices){}

  
  @Get()
  async getProductos(): Promise<ProductoDto[]>{
    return await this.productosService.getAllProductos();
  }


  @Post()
  async crearProducto(@Body() body: ProductoDto): Promise<ProductoDto> {
    return await this.productosService.crearProducto(body);
  };

  @Put('/:productoId')
  async actualizarProducto(@Body() body:ProductoDto, @Param('productoId') productoId:number):Promise<ProductoDto>{
    return await this.productosService.actualizarProducto(productoId,body);
  }

  @Delete('/:productoId')
  async eliminarProducto(@Param('productoId') productoId:number):Promise<void | string>{
    return await this.productosService.eliminarProducto(productoId);
  }





}


