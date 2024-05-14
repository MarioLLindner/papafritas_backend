import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class JwtMiddlewareGuard implements CanActivate {
  constructor(private readonly JwtService: JwtService) { }

  // CanActivate es un metodo de JwtService que sirve para acceder a los detalles del contexto actual de ejecucion y obtener de ahi los datos de la solicitud HTTP que el cliente o postman le hace a nuestra api.
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

    // En Reques transformamos la informacion recibida de String a tipo HTTP y la transformamos en un objeto para poder manejar sus atributos y metodos
    const request = context.switchToHttp().getRequest();

    // En token guardamos el codigo de autorizacion que se nos envio en la solicitud HTTP del cliente
    const token = this.getTokenEncabezado(request.headers.authorization);

    // Si no tenemos un Token, retornamos falso y no permitimos continuar
    if (!token) {
      return false;
    }

    try {
      // En caso de recibir un token, lo decodificamos y lo guardamos
      const decodedToken = this.JwtService.decode(token);
      // Asigno decodedToken a reques.user
      request.user = decodedToken;
      return true;
    } catch (error) {
      return false;
    }

  }

  // Recibo el token de autorizacion desde el cliente o postman (El bearer que ingresamos en postman)
  private getTokenEncabezado(authorization: string): string | null {
    // Evaluo si el token existe o si inicia con 'Bearer ', en caso de que si, retorno el token
    if (!authorization || !authorization.startsWith('Bearear ')) {
      return null;
    }
    return authorization.split(' ')[1];
  };
}