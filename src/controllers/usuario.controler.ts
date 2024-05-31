import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { UsuarioService } from "src/services/usuario.service";
import UsuarioDto from "src/models/usuario.dto";
import { JwtMiddlewareGuard } from 'src/services/Jwtguard.service';


@Controller('/user')
export class usuarioControler {
  constructor(private readonly usuarioService: UsuarioService) { }

  @Post()
  async crearUsuario(@Body() newUser: UsuarioDto, request: Request): Promise<UsuarioDto> {
    return await this.usuarioService.registrarUsuario(newUser)
  }

  @Get()
  @UseGuards(JwtMiddlewareGuard)
  async GetAllUsers(): Promise<UsuarioDto[]> {
    return this.usuarioService.getAllUsers();
  }

  /*agregar guards al manejo de usuarios */

}


