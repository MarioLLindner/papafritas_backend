import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from './db.service';
import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import productoQueries from './queries/productos.queries';
import ProductoDto from 'src/models/producto.dto';

@Injectable()

export class productosServices {
  constructor(private dbService: DatabaseService) { }

  async getAllProductos(): Promise<ProductoDto[]> {
    const resultQuery: RowDataPacket[] = await this.dbService.executeSelect(productoQueries.selectAll, []);
    const resultProducto = resultQuery.map((rs: RowDataPacket) => {
      return {
        productoId: rs['productoId'],
        nombre: rs['nombre'],
        descripcion: rs['descripcion'],
        imagenLink: rs['imagenLink'],
        detalles: rs['detalles'],
        precio: rs['precio'],
        precioOferta: rs['preciooferta'],
      }
    });
    return resultProducto;
  }

  async getProducto(productoId: number): Promise<ProductoDto | null> {
    const resultQuery: RowDataPacket[] = await this.dbService.executeSelect(productoQueries.selectOne, [productoId]);
    
    if (resultQuery.length === 0) {
      return null;
    }
    const rs: RowDataPacket = resultQuery[0];
    const producto: ProductoDto = {
      productoId: rs['productoId'],
      nombre: rs['nombre'],
      descripcion: rs['descripcion'],
      imagenLink: rs['imagenLink'],
      detalles: rs['detalles'],
      precio: rs['precio'],
      precioOferta: rs['preciooferta'],
    };

    return producto;
  }

  async getRandomProductos(): Promise<ProductoDto[]> {
    const resultQuery: RowDataPacket[] = await this.dbService.executeSelect(productoQueries.selectOfert, []);
    const resultProducto = resultQuery.map((rs: RowDataPacket) => {
      return {
        productoId: rs['productoId'],
        nombre: rs['nombre'],
        descripcion: rs['descripcion'],
        imagenLink: rs['imagenLink'],
        detalles: rs['detalles'],
        precio: rs['precio'],
        precioOferta: rs['precioOferta'],
      }
    });
    return resultProducto;
  }

  async crearProducto(producto: ProductoDto): Promise<ProductoDto> {
    const resultQuery: ResultSetHeader = await this.dbService.executeQuery(productoQueries.insert,
      [producto.nombre, producto.descripcion, producto.imagenLink, producto.detalles, producto.precio, producto.precioOferta]);
    return {
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      imagenLink: producto.imagenLink,
      detalles: producto.detalles,
      precio: producto.precio,
      precioOferta: producto.precioOferta
    };
  };

  async actualizarProducto(productoID: number, producto: ProductoDto): Promise<ProductoDto> {
    const resultQuery: ResultSetHeader = await this.dbService.executeQuery(productoQueries.update,
      [producto.nombre, producto.descripcion, producto.imagenLink, producto.detalles, producto.precio, producto.precioOferta, productoID]);
    if (resultQuery.affectedRows == 1) {
      /* console.log('producto modificado product service back, L62',producto); */
      return producto;
    }
    throw new HttpException("No se pudo actualizar el producto ya que no se encontro el Id", HttpStatus.NOT_FOUND)
  };


  /* ELIMINADO ES CASCADA, CUANDO UN USUARIO LO TIENE EN CARRITO DE COMPRAS */
  async eliminarProducto(productoId: number): Promise<void | string> {
    try {
      const resultQuery: ResultSetHeader = await this.dbService.executeQuery(productoQueries.delete, [productoId]);
      if (resultQuery.affectedRows == 0) {
        throw new HttpException("No se pudo eliminar el producto por que no existe dicho Id", HttpStatus.NOT_FOUND)
      } else { return ('Producto eliminado con exito'); }
    } catch (error) {
      console.log(error)
      if (error.errnumero == 1451) {
        // Error 409 conflicto entre lo que se quiere eliminar y lo que hay en la base de datos
        throw new HttpException('No se pudo eliminar el producto ya que esta referenciado por otro registro', HttpStatus.CONFLICT);
      }
      throw new HttpException(`Error eliminando el producto: ${error.sqlMessage}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  };

  async addToCart(productoId: number, userId: number): Promise<void | string> {
    try {
      console.log('producto | user ID');
      console.log(productoId + '|' + userId);
      const resultQuery: ResultSetHeader = await this.dbService.executeQuery(productoQueries.addToCart, [productoId, userId])
      console.log(resultQuery)
    } catch (error) {
      throw new HttpException(`error añadiendo producto al carrito' ${error.sqlMessage}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getForCart(userId: number): Promise<ProductoDto[]> {
    console.log(userId)
    const resultQuery: RowDataPacket[] = await this.dbService.executeSelect(productoQueries.getForCart, [userId]);
    const resultProducto = resultQuery.map((rs: RowDataPacket) => {
      return {
        productoId: rs['productoId'],
        nombre: rs['nombre'],
        descripcion: rs['descripcion'],
        imagenLink: rs['imagenLink'],
        detalles: rs['detalles'],
        precio: rs['precio'],
        precioOferta: rs['preciooferta'],
      }
    });
    console.log('result PRODUCTO SERVICEEEEEEE BACK',resultProducto)
    return resultProducto;
  }


}