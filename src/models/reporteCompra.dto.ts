import { IsDate, isInt, IsInt, IsOptional, IsString } from 'class-validator';

class ReporteCompraDto {

  @IsInt()
  idCompra:number;

  @IsInt()
  @IsOptional()
  idReporte:number;

  @IsInt()
  @IsOptional()
  idProducto:number;

  @IsInt()
  cantidad:number;

  @IsOptional()
  precioUnitario:number;
}
export default ReporteCompraDto;