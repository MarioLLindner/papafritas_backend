import { IsInt, IsOptional, IsString } from 'class-validator';

class ProductoDto {
  @IsInt()
  @IsOptional()
  productoId?: number;

  @IsString()
  nombre: string;

  @IsString()
  descripcion: string;

  @IsString()
  imagenLink: string;

  @IsString()
  detalles: string;
  
  @IsInt()
  precio: number;

  @IsInt()
  @IsOptional()
  precioOferta?: number;
}

export default ProductoDto;