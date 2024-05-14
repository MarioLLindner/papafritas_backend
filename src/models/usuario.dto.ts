import { IsInt, IsOptional, IsString } from 'class-validator';

class UsuarioDto {
  userId?: number;
  @IsOptional()
  email: string;
  @IsOptional()
  password: string;
  telefono: number;
  provincia: string;
  ciudad: string;
  codigoPostal: string;
  direccion: string;
  activo?: number;
}

export default UsuarioDto;

