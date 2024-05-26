import { Body, Controller, Get, Post } from "@nestjs/common";
import { UsuarioService } from "src/services/usuario.service";
import UsuarioDto from "src/models/usuario.dto";


@Controller('/register')
export class usuarioControler {
  constructor(private readonly usuarioService: UsuarioService) { }

  @Post()
  async crearUsuario(@Body() newUser: UsuarioDto, request: Request): Promise<UsuarioDto> {
    return await this.usuarioService.registrarUsuario(newUser)
  }

  @Get()
  async GetAllUsers(): Promise<UsuarioDto[]> {
    return this.usuarioService.getAllUsers();
  }

}


