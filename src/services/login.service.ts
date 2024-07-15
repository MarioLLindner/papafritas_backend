import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { RowDataPacket } from "mysql2";
import { DatabaseService } from './db.service';
import usuariosQueries from './queries/usuarios.queries';
import UserLoginDto from 'src/models/userLogin.dto';
import { generateHash } from './hashingService';

@Injectable()
export class loginService {
  constructor(private jwtService: JwtService, private dbService: DatabaseService) {
  }

  async validateUser(uEmail: string, uPassword: string): Promise<any> {
    try {
      const passHashFromRequest = await generateHash(uPassword);
      const userResult = await this.getUser(uEmail, passHashFromRequest);
        if (userResult.email === uEmail && userResult.password === passHashFromRequest) {
            return {
                userId: userResult.userId,
                nombre: userResult.nombre,
                admin: userResult.admin
            };
        }
    } catch (error) {
        console.log(error);
        throw new HttpException('Acceso denegado', HttpStatus.UNAUTHORIZED);;
    }

    return null;
}

  login(user: any) {
    const payload = { usuario: user };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async getUser(email: string, password: string): Promise<UserLoginDto> {
    const resultQuery: RowDataPacket[] = await this.dbService.executeSelect(usuariosQueries.selectByEmailAndPass, [email, password]);
    if (resultQuery.length === 0) {
      throw new HttpException('Acceso denegado', HttpStatus.UNAUTHORIZED);
    }
    const result = resultQuery[0];

    console.log('Resultado en login.service.back linea 50', result);
    return { 
      userId:result['userId'],
      email: result['email'],
      nombre:result['nombre'],
      password: result['password'],
      admin: result['admin']
    }
  }

}
