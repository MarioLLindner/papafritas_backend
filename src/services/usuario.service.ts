import { Injectable } from '@nestjs/common';
import { DatabaseService } from './db.service';
import UsuarioDto from 'src/models/usuario.dto';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import usuariosQueries from './queries/usuarios.queries';


@Injectable()
export class UsuarioService {
  constructor(private dbService: DatabaseService) { }

  async registrarUsuario(user: UsuarioDto): Promise<UsuarioDto> {
    const resultQuery: ResultSetHeader = await this.dbService.executeQuery(usuariosQueries.registrar,
      [user.email, user.password, user.telefono, user.provincia, user.ciudad, user.codigoPostal, user.direccion, user.activo]);
    return {
      email: user.email,
      password: user.password,
      telefono: user.telefono,
      provincia: user.provincia,
      ciudad: user.ciudad,
      codigoPostal: user.codigoPostal,
      direccion: user.direccion,
      activo: user.activo
    };
  };

  async getAllUsers(): Promise<UsuarioDto[]> {
    const resultQuery: RowDataPacket[] = await this.dbService.executeSelect(usuariosQueries.selectAll, []);
    const resultUsers = resultQuery.map((rs: RowDataPacket) => {
      return {
        userId: rs['userId'],
        email: rs['email'],
        password: rs['password'],
        telefono: rs['telefono'],
        provincia: rs['provincia'],
        ciudad: rs['ciudad'],
        codigoPostal: rs['codigoPostal'],
        direccion: rs['direccion'],
        activo: rs['activo']
      }
    }
  )
  return resultUsers;
  }
}