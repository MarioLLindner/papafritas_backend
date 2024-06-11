import { Body, Controller, Get, Post, Put, Delete } from "@nestjs/common";
import { UsuarioService } from "src/services/usuario.service";
import UsuarioDto from "src/models/usuario.dto";


@Controller('/user')
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

  @Put()
  async actualizarUsuario(@Body() body:UsuarioDto):Promise<UsuarioDto>{
    return await this.usuarioService.userUpdate(body);
  }

  @Delete()
  async eliminarProducto(@Body() body:{userId:number}):Promise<void | string>{
    return await this.usuarioService.eliminarUsuario(body.userId);
  }
}
