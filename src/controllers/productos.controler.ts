import {
  Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Patch, Post, Put, Res, UseGuards,Query
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
  
  @Get('producto/:productoId')
  async getProducto(@Param('productoId') productoId: number){
    return await this.productosService.getProducto(productoId);
  }


  @Get('random')
  async getRandomProductos(){
    return this.productosService.getRandomProductos();
  }


  @Post()
  async crearProducto(@Body() body: ProductoDto): Promise<ProductoDto> {
    return await this.productosService.crearProducto(body);
  };

  @Put()
  async actualizarProducto(@Body() body:ProductoDto):Promise<ProductoDto>{
    return await this.productosService.actualizarProducto(body.productoId,body);
  }

  @Delete()
  async eliminarProducto(@Body() body:{productoId:number}):Promise<void | string>{
    return await this.productosService.eliminarProducto(body.productoId);
  }

  @Post('carrito')
  async addToCart(@Body() body: {productoId:number,userId:number}):Promise<void | string>{
    return await this.productosService.addToCart(body.productoId,body.userId);
  };

  @Get('carrito')
  async getForCart(@Query('userId')userId: number): Promise<ProductoDto[]>{
    return await this.productosService.getForCart(userId);
  }
}


