import { IsInt, IsOptional, IsString, isString } from 'class-validator';

class UsuarioDto {
  userId?: number;
  @IsOptional()
  email: string;

  @IsOptional()
  password: string;
  
  @IsOptional()
  telefono: number;

  @IsOptional()
  provincia: string;

  @IsOptional()
  ciudad: string;

  @IsOptional()
  codigoPostal: string;
  
  @IsOptional()
  direccion: string;

  activo?: boolean;
  admin?:boolean;
}

export default UsuarioDto;

