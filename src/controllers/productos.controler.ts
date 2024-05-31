import {
  Body, Controller, Delete, Get, Param, Post, Put, UseGuards,
} from '@nestjs/common';
import ProductoDto from 'src/models/producto.dto';
import { JwtMiddlewareGuard } from 'src/services/Jwtguard.service';
import { productosServices } from 'src/services/productos.service';


@Controller('/api/productos')

export class ProductosControler{
  constructor(private readonly productosService:productosServices){}

  
  @Get()
  async getProductos(): Promise<ProductoDto[]>{
    return await this.productosService.getAllProductos();
  }


  @Post()
  @UseGuards(JwtMiddlewareGuard)
  async crearProducto(@Body() body: ProductoDto): Promise<ProductoDto> {
    return await this.productosService.crearProducto(body);
  };

  @Put('/:productoId')
  @UseGuards(JwtMiddlewareGuard)
  async actualizarProducto(@Body() body:ProductoDto, @Param('productoId') productoId:number):Promise<ProductoDto>{
    return await this.productosService.actualizarProducto(productoId,body);
  }

  @Delete('/:productoId')
  @UseGuards(JwtMiddlewareGuard)
  async eliminarProducto(@Param('productoId') productoId:number):Promise<void | string>{
    return await this.productosService.eliminarProducto(productoId);
  }





}


