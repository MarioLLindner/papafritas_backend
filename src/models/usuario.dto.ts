import { IsInt, IsOptional, IsString } from 'class-validator';

class UsuarioDto {
  @IsInt()
  @IsOptional()
  userId?: number;
  
  @IsOptional()
  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  nombre: string;

  @IsOptional()
  @IsString()
  apellido: string;

  @IsOptional()
  @IsString()
  password: string;

  @IsOptional()
  @IsString()
  telefono: string;

  @IsOptional()
  @IsString()
  provincia: string;

  @IsOptional()
  @IsString()
  ciudad: string;

  @IsOptional()
  @IsString()
  codigoPostal: string;

  @IsOptional()
  @IsString()
  direccion: string;

  activo?: boolean;
  admin?: boolean;
}

export default UsuarioDto;

