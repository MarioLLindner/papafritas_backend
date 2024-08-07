import { IsInt, IsOptional, IsString } from 'class-validator';

class SubCategoriaDto {
  @IsInt()
  @IsOptional()
  idSubCategoria?: number;

  @IsInt()
  @IsOptional()
  idCategoria?: number;

  @IsString()
  @IsOptional()
  nombreSubCategoria: string;

}
export default SubCategoriaDto;