import { IsInt, IsOptional, IsString, isInt } from 'class-validator';

class ProductoDto {
  @IsInt()
  @IsOptional()
  productoId?: number;

  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  marca: string;

  @IsString()
  descripcion: string;

  @IsString()
  imagenLink: string;

  @IsString()
  detalles: string;

  @IsInt()
  stock: number;

  @IsInt() 
  precio: number;

  @IsOptional()
  precioOferta?: number;
}

export default ProductoDto;