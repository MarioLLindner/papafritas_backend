import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { ResultSetHeader, RowDataPacket } from "mysql2";
import { DatabaseService } from './db.service';
import usuariosQueries from './queries/usuarios.queries';
import UserLoginDto from 'src/models/userLogin.dto';


@Injectable()
export class loginService {
  salt: string = '$2a$08$W59jWcwio1TiLx4A8iRyTO';
  joseHash: string;
  constructor(private jwtService: JwtService, private dbService: DatabaseService) {
    this.genSalt();
  }

  async genSalt() {
    this.joseHash = await bcrypt.hash('jose', this.salt);
  }

  async validateUser(uEmail: string, uPassword: string): Promise<any> {
    /*TRY */
    try {
      const userResult = await this.getUser(uEmail, uPassword)
    
    if (userResult.email === uEmail && userResult.password === uPassword) {
      /* if(uEmail === 'admin' && uPassword==='admin') */
      /*  const passEncriptado = await bcrypt.hash(uPassword, this.salt); */
      return {
        username: uEmail,
      };
      /*  if (this.joseHash == passEncriptado) {
         // retorno el objeto usuario
       } */
      return null;
    }
  } catch (error) {
    console.log(error);
    throw new UnauthorizedException(`Invalid email or password whit`)
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
      throw new NotFoundException(`Invalid email or password whit ${email} ${password}`)
    }
    const result = resultQuery[0];

    return {
      email: result['email'],
      password: result['password']
    }

  }

}
