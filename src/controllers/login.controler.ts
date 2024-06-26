/* eslint-disable prettier/prettier */
import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { loginService } from 'src/services/login.service';

@Controller('/auth')
export class LoginController {
  constructor(private loginService: loginService) {}

  @Post('/login')
  async login(@Body() body: { username: string; password: string }) {
    const user = await this.loginService.validateUser(body.username, body.password);
    if (!user) {
      throw new HttpException('No autorizado', HttpStatus.UNAUTHORIZED);
    }
    return this.loginService.login(user);
  }

}
