import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from './db.service';
import { ResultSetHeader, RowDataPacket } from 'mysql2/promise';
import productoQueries from './queries/productos.queries';
import ProductoDto from 'src/models/producto.dto';
import CategoriaDto from 'src/models/categoria.dto';
import SubCategoriaDto from 'src/models/subCategoria.dto';

@Injectable()

export class productosServices {
  constructor(private dbService: DatabaseService) { }

  async getAllProductos(): Promise<ProductoDto[]> {
    const resultQuery: RowDataPacket[] = await this.dbService.executeSelect(productoQueries.selectAll, []);
    const resultProducto = resultQuery.map((rs: RowDataPacket) => {
      return {
        productoId: rs['productoId'],
        nombre: rs['nombre'],
        marca: rs['marca'],
        descripcion: rs['descripcion'],
        imagenLink: rs['imagenLink'],
        detalles: rs['detalles'],
        precio: rs['precio'],
        precioOferta: rs['preciooferta'],
        stock: rs['stock'],
        categoria: rs['categoria'],
        subcategoria: rs['subcategoria'],
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
      marca: rs['marca'],
      descripcion: rs['descripcion'],
      imagenLink: rs['imagenLink'],
      detalles: rs['detalles'],
      precio: rs['precio'],
      precioOferta: rs['preciooferta'],
      stock: rs['stock'],
      categoria: rs['categoria'],
      subcategoria: rs['subcategoria']
    };

    return producto;
  }

  async getRandomProductos(): Promise<ProductoDto[]> {
    const resultQuery: RowDataPacket[] = await this.dbService.executeSelect(productoQueries.selectOfert, []);
    const resultProducto = resultQuery.map((rs: RowDataPacket) => {
      return {
        productoId: rs['productoId'],
        nombre: rs['nombre'],
        marca: rs['marca'],
        descripcion: rs['descripcion'],
        imagenLink: rs['imagenLink'],
        detalles: rs['detalles'],
        precio: rs['precio'],
        precioOferta: rs['precioOferta'],
        stock: rs['stock'],
        categoria: rs['categoria'],
        subcategoria: rs['subcategoria']
      }
    });
    return resultProducto;
  }

  async crearProducto(producto: ProductoDto): Promise<ProductoDto> {
    const resultQuery: ResultSetHeader = await this.dbService.executeQuery(productoQueries.insert,
      [producto.nombre, producto.marca, producto.descripcion, producto.imagenLink, producto.detalles, producto.precio,
      producto.precioOferta, producto.stock, producto.categoria, producto.subcategoria]);
/*       console.log('PRODUCTO BACKKK:',resultQuery) */
    return {
      nombre: producto.nombre,
      marca: producto.marca,
      descripcion: producto.descripcion,
      imagenLink: producto.imagenLink,
      detalles: producto.detalles,
      precio: producto.precio,
      precioOferta: producto.precioOferta,
      stock: producto.stock,
      categoria: producto.categoria,
      subcategoria: producto.subcategoria
    };
  };

  async actualizarProducto(productoID: number, producto: ProductoDto): Promise<ProductoDto> {
    const resultQuery: ResultSetHeader = await this.dbService.executeQuery(productoQueries.update,
      [producto.nombre, producto.marca, producto.descripcion, producto.imagenLink, producto.detalles,
      producto.precio, producto.precioOferta, producto.stock, producto.categoria, producto.subcategoria, productoID]);
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
        throw new HttpException('No se pudo eliminar el producto ya que esta referenciado por otro registro', HttpStatus.CONFLICT);
      }
      throw new HttpException(`Error eliminando el producto: ${error.sqlMessage}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  };

  async addToCart(productoId: number, userId: number): Promise<void | string> {
    try {
      const resultQuery: ResultSetHeader = await this.dbService.executeQuery(productoQueries.addToCart, [productoId, userId])
    } catch (error) {
      throw new HttpException(`error añadiendo producto al carrito' ${error.sqlMessage}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async delToCart(productoId: number, userId: number): Promise<void> {
    try {
      const resultQuery: ResultSetHeader = await this.dbService.executeQuery(productoQueries.delToCart, [productoId, userId]);
    } catch (error) {
      throw new HttpException(`Error eliminando producto del carrito: ${error.sqlMessage}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async deleteCart(userId: number): Promise<void> {
    try {
      const resultQuery: ResultSetHeader = await this.dbService.executeQuery(productoQueries.deleteCart, [userId]);
    } catch (error) {
      throw new HttpException(`Error eliminando producto del carrito: ${error.sqlMessage}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  async getForCart(userId: number): Promise<ProductoDto[]> {
    /* console.log('id del usuario a buscar carrito. l136:', userId) */
    const resultQuery: RowDataPacket[] = await this.dbService.executeSelect(productoQueries.getForCart, [userId]);
    const resultProducto = resultQuery.map((rs: RowDataPacket) => {
      return {
        productoId: rs['productoId'],
        nombre: rs['nombre'],
        marca: rs['marca'],
        descripcion: rs['descripcion'],
        imagenLink: rs['imagenLink'],
        detalles: rs['detalles'],
        precio: rs['precio'],
        precioOferta: rs['preciooferta'],
        stock: rs['stock'],
        categoria: rs['categoria'],
        subcategoria: rs['subcategoria']
      }
    });
    return resultProducto;
  }



  
  /*-----------------------------CATEGORIA----------------------------------------- */
  async getAllCategorias(): Promise<CategoriaDto[]> {
    const resultQuery: RowDataPacket[] = await this.dbService.executeSelect(productoQueries.getAllCategorias, [])
    const resultCategoria = resultQuery.map((rs: RowDataPacket) => {
      return {
        idCategoria: rs['idCategoria'],
        nombreCategoria: rs['nombreCategoria']
      }
    });
    return resultCategoria;
  }

  async crearCategoria(categoria: CategoriaDto): Promise<CategoriaDto> {
    const resultQuery: ResultSetHeader = await this.dbService.executeQuery(productoQueries.crearCategoria,
      [categoria.idCategoria,categoria.nombreCategoria]);
    return {
      idCategoria: categoria.idCategoria,
      nombreCategoria: categoria.nombreCategoria
    };
  }

  async actualizarCategoria(idCategoria: number, categoria: CategoriaDto): Promise<CategoriaDto> {
    const resultQuery: ResultSetHeader = await this.dbService.executeQuery(productoQueries.updateCategoria,
      [categoria.nombreCategoria, idCategoria]);
    if (resultQuery.affectedRows == 1) {
      return categoria;
    }
    throw new HttpException("No se pudo actualizar la categoria ya que no se encontro el Id", HttpStatus.NOT_FOUND)
  };

  async eliminarCategoria(idCategoria: number): Promise<void | string> {
    try {
      const resultQuery: ResultSetHeader = await this.dbService.executeQuery(productoQueries.deleteCategoria, [idCategoria]);
      if (resultQuery.affectedRows == 0) {
        throw new HttpException("No se pudo eliminar la categoria por que no existe dicho Id", HttpStatus.NOT_FOUND)
      } else { return ('Categoria eliminado con exito'); }
    } catch (error) {
      throw new HttpException(`Error eliminando la categoria: ${error.sqlMessage}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  };

  

  async getNombreCatbyId(idCategoria: number): Promise<string> {
    try {
      const resultQuery: RowDataPacket[] = await this.dbService.executeSelect(productoQueries.getNombreCategoriabyId, [idCategoria])
      const resultCategoria = resultQuery.map((rs: RowDataPacket) => {
        return {
          idCategoria: rs['idCategoria'],
          nombreCategoria: rs['nombreCategoria']
        }
      });
      return resultCategoria[0].nombreCategoria;
      
    } catch (error) {
      console.log(error)
    }
  }


  /*----------------------SUB-CATEGORIA----------------------------------------- */
  async getAllSubCategorias(): Promise<SubCategoriaDto[]> {
    const resultQuery: RowDataPacket[] = await this.dbService.executeSelect(productoQueries.getAllSubCategorias, [])
    const resultCategoria = resultQuery.map((rs: RowDataPacket) => {
      return {
        idCategoria: rs['idCategoria'],
        idSubCategoria: rs['idSubCategoria'],
        nombreSubCategoria: rs['nombreSubCategoria']
      }
    });
    return resultCategoria;
  }

  async getAllSubCategoriasByIDcategoria(idCategoria:number): Promise<SubCategoriaDto[]> {
    const resultQuery: RowDataPacket[] = await this.dbService.executeSelect(productoQueries.getAllSubCategoriasByIDcategoria, [idCategoria])
    const resultCategoria = resultQuery.map((rs: RowDataPacket) => {
      return {
        idCategoria: rs['idCategoria'],
        idSubCategoria: rs['idSubCategoria'],
        nombreSubCategoria: rs['nombreSubCategoria']
      }
    });
    return resultCategoria;
  }

  async crearSubCategoria(categoria: SubCategoriaDto): Promise<SubCategoriaDto> {
    const resultQuery: ResultSetHeader = await this.dbService.executeQuery(productoQueries.crearSubCategoria,
      [categoria.idCategoria, categoria.nombreSubCategoria]);
    return {
      idCategoria: categoria.idCategoria,
      nombreSubCategoria: categoria.nombreSubCategoria
    };
  }

  async actualizarSubCategoria(idCategoria: number, categoria: SubCategoriaDto): Promise<SubCategoriaDto> {
    const resultQuery: ResultSetHeader = await this.dbService.executeQuery(productoQueries.updateSubCategoria,
      [categoria.idSubCategoria, categoria.nombreSubCategoria, categoria.idCategoria]);
    if (resultQuery.affectedRows == 1) {
      return categoria;
    }
    throw new HttpException("No se pudo actualizar la categoria ya que no se encontro el Id", HttpStatus.NOT_FOUND)
  };

  async eliminarSubCategoria(idCategoria: number): Promise<void | string> {
    try {
      const resultQuery: ResultSetHeader = await this.dbService.executeQuery(productoQueries.deleteSubCategoria, [idCategoria]);
      if (resultQuery.affectedRows == 0) {
        throw new HttpException("No se pudo eliminar la categoria por que no existe dicho Id", HttpStatus.NOT_FOUND)
      } else { return ('Categoria eliminado con exito'); }
    } catch (error) {
      throw new HttpException(`Error eliminando la categoria: ${error.sqlMessage}`, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  };


}
