import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseService } from './services/db.service';
import { LoginController } from './controllers/login.controler';
import { loginService } from './services/login.service';
import { ProductosControler } from './controllers/productos.controler';
import { productosServices } from './services/productos.service';
import { usuarioControler } from './controllers/usuario.controler';
import { UsuarioService } from './services/usuario.service';

@Module({
  imports: [
    JwtModule.register({
    secret:
    'qwerqwertyuiopásdfghjklñzxcv+-321qwertyuiopásdfghjklñzxcv+-32189qwertyuiopásdfghjklñzxcv+-32189786*786*89786*tyuiopásdfghjklñzxcv+-32189786*bnm,',
    signOptions: { expiresIn: '1h' },
  }),],
  controllers: [AppController,LoginController,ProductosControler,usuarioControler],
  providers: [AppService,loginService,DatabaseService,productosServices,UsuarioService],
})
export class AppModule {}
