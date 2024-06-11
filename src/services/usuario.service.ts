import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DatabaseService } from './db.service';
import UsuarioDto from 'src/models/usuario.dto';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import usuariosQueries from './queries/usuarios.queries';
import { generateHash } from './hashingService';

@Injectable()
export class UsuarioService {
  constructor(private dbService: DatabaseService) { }

  async registrarUsuario(user: UsuarioDto): Promise<UsuarioDto> {
    //encriptar password
    const passHashFromRequest = await generateHash(user.password);
    const resultQuery: ResultSetHeader = await this.dbService.executeQuery(usuariosQueries.registrar,
      [user.email, passHashFromRequest, user.nombre, user.apellido, user.telefono, user.provincia, user.ciudad, user.codigoPostal, user.direccion, user.activo]);
    return {
      email: user.email,
      password: passHashFromRequest,
      nombre: user.nombre,
      apellido: user.apellido,
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
        nombre: rs['nombre'],
        apellido: rs['apellido'],
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

  async userUpdate(usuario: UsuarioDto): Promise<UsuarioDto> {
    const resultQuery: ResultSetHeader = await this.dbService.executeQuery(usuariosQueries.update,
      [usuario.email, usuario.nombre, usuario.apellido, usuario.password, usuario.telefono, 
        usuario.provincia, usuario.ciudad, usuario.codigoPostal, usuario.direccion, usuario.activo, usuario.userId]);
    if (resultQuery.affectedRows == 1) {
      return usuario;
    }
    throw new HttpException("No se pudo actualizar el usuario ya que no se encontro el Id", HttpStatus.NOT_FOUND)
  };

  async eliminarUsuario(productoId: number): Promise<void | string> {
    try {
      const resultQuery: ResultSetHeader = await this.dbService.executeQuery(usuariosQueries.delete, [productoId]);
      if (resultQuery.affectedRows == 0) {
        throw new HttpException("No se pudo eliminar el usuario por que no existe dicho Id", HttpStatus.NOT_FOUND)
      } else { return ('Usuario eliminado con exito'); }
    } catch (error) {
      console.log(error)
      if (error.errnumero == 1451) {
        // Error 409 conflicto entre lo que se quiere eliminar y lo que hay en la base de datos
        throw new HttpException('No se pudo eliminar el usuario ya que esta referenciado por otro registro', HttpStatus.CONFLICT);
      }
      throw new HttpException(`Error eliminando el usuario: ${error.sqlMessage}`, HttpStatus.INTERNAL_SERVER_ERROR);
    } 

  };

}
