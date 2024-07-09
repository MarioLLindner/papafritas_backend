import { IsDate, isInt, IsInt, IsOptional, IsString } from 'class-validator';

class ReporteDto {

  @IsInt()
  @IsOptional()
  idReporte:number;

  @IsInt()
  @IsOptional()
  idUsuario:number;

  @IsDate()
  fechaReporte:Date;

  @IsInt()
  montoGastado:number;
}
export default ReporteDto;