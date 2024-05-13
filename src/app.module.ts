import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseService } from './services/db.service';
import { LoginController } from './controllers/login.controler';
import { loginService } from './services/login.service';
import { ProductosControler } from './controllers/productos.controler';
import { productosServices } from './services/productos.service';

@Module({
  imports: [
    JwtModule.register({
    secret:
      'clave',
    signOptions: { expiresIn: '1h' },
  }),],
  controllers: [AppController,LoginController,ProductosControler],
  providers: [AppService,loginService,DatabaseService,productosServices],
})
export class AppModule {}
