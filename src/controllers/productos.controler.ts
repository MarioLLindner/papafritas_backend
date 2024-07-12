import {
  Body, Controller, Delete, Get, HttpStatus, Param, ParseIntPipe, Patch, Post, Put, Res, UseGuards, Query
} from '@nestjs/common';
import CategoriaDto from 'src/models/categoria.dto';
import ProductoDto from 'src/models/producto.dto';
import SubCategoriaDto from 'src/models/subCategoria.dto';
import { productosServices } from 'src/services/productos.service';


@Controller('/api/productos')

export class ProductosControler {
  constructor(private readonly productosService: productosServices) { }


  @Get()
  async getProductos(): Promise<ProductoDto[]> {
    return await this.productosService.getAllProductos();
  }

  @Get('producto/:productoId')
  async getProducto(@Param('productoId') productoId: number) {
    return await this.productosService.getProducto(productoId);
  }


  @Get('random')
  async getRandomProductos() {
    return this.productosService.getRandomProductos();
  }


  @Post()
  async crearProducto(@Body() body: ProductoDto): Promise<ProductoDto> {
    return await this.productosService.crearProducto(body);
  };

  @Put()
  async actualizarProducto(@Body() body: ProductoDto): Promise<ProductoDto> {
    return await this.productosService.actualizarProducto(body.productoId, body);
  }

  @Delete()
  async eliminarProducto(@Body() body: { productoId: number }): Promise<void | string> {
    return await this.productosService.eliminarProducto(body.productoId);
  }

  @Post('carrito')
  async addToCart(@Body() body: { productoId: number, userId: number }): Promise<void | string> {
    return await this.productosService.addToCart(body.productoId, body.userId);
  };

  @Delete('carrito')
  async delToCart(@Body() body: { productoId: number, userId: number }): Promise<void> {
    await this.productosService.delToCart(body.productoId, body.userId);
  }

  @Delete('deleteCart')
  async deleteCart(@Body() body: {userId: number }): Promise<void> {
    await this.productosService.deleteCart(body.userId);
  }

  @Get('carrito')
  async getForCart(@Query('userId') userId: number): Promise<ProductoDto[]> {
    return await this.productosService.getForCart(userId);
  }

  @Get('categoria')
  async getCategoria(): Promise<CategoriaDto[]> {
    return await this.productosService.getAllCategorias();
  }



  
  @Post('categoria')
  async crearCategoria(@Body() body: CategoriaDto): Promise<CategoriaDto> {
    return await this.productosService.crearCategoria(body);
  };

  @Put('categoria')
  async actualizarCategoria(@Body() body: CategoriaDto): Promise<CategoriaDto> {
    return await this.productosService.actualizarCategoria(body.idCategoria, body);
  }

  @Delete('categoria')
  async eliminarCategoria(@Body() body: { idCategoria: number }): Promise<void | string> {
    return await this.productosService.eliminarCategoria(body.idCategoria);
  }

/*   @Get('catName')
  async getNombreCatbyId(@Body() body: { idCategoria: number }): Promise<string|void> {
    console.log('el body del back:',body)
    const nombreCategoria = await this.productosService.getNombreCatbyId(body.idCategoria);
    console.log('NOMBRE CATEGORIA CONTROLER BACKEND:',nombreCategoria)
    return nombreCategoria
  } */

  @Get('catName')
  async getNombreCatbyId(@Query('idCategoria') idCategoria: number ): Promise<string|void> {
    console.log('el body del back:',idCategoria)
    if(idCategoria == undefined || idCategoria == null){
      return null
    }else{
      const nombreCategoria = await this.productosService.getNombreCatbyId(idCategoria);
      console.log('nombreCategoria;:',nombreCategoria)
      return await this.productosService.getNombreCatbyId(idCategoria);
    }
  }


  @Get('subcategorias')
  async getAllSubCategorias(): Promise<SubCategoriaDto[]> {
    return await this.productosService.getAllSubCategorias();
  }
  
  @Get('subcategoria')
  async getAllSubCategoriasByIDcategoria(@Query('idCategoria') idCategoria: number ): Promise<SubCategoriaDto[]> {
  
    return await this.productosService.getAllSubCategoriasByIDcategoria(idCategoria);
  }

  @Post('subcategoria')
  async crearSubCategoria(@Body() body: SubCategoriaDto): Promise<SubCategoriaDto> {
    return await this.productosService.crearSubCategoria(body);
  };

  @Put('subcategoria')
  async actualizarSubCategoria(@Body() body: SubCategoriaDto): Promise<SubCategoriaDto> {
    return await this.productosService.actualizarSubCategoria(body.idSubCategoria, body);
  }

  @Delete('subcategoria')
  async eliminarSubCategoria(@Body() body: { idSubCategoria: number }): Promise<void | string> {
    return await this.productosService.eliminarSubCategoria(body.idSubCategoria);
  }



}


