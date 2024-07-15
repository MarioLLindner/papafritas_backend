import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";

@Injectable()
export class JwtMiddlewareGuard implements CanActivate {
  constructor(private readonly JwtService: JwtService) { }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = this.getTokenEncabezado(request.headers.authorization);
    if (!token) {
      return false;
    }
    try {
      const decodedToken = this.JwtService.decode(token);
      request.user = decodedToken;
      return true;
    } catch (error) {
      return false;
    }

  }

  private getTokenEncabezado(authorization: string): string | null {
    if (!authorization || !authorization.startsWith('Bearear ')) {
      return null;
    }
    return authorization.split(' ')[1];
  };
}