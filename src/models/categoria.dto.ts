import { IsInt, IsOptional, IsString } from 'class-validator';

class CategoriaDto {
  @IsInt()
  @IsOptional()
  idCategoria?: number;

  @IsString()
  @IsOptional()
  nombreCategoria: string;

}
export default CategoriaDto;