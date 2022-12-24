import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get('roles', context.getHandler());

    if (!roles) {
      return true;
    }

    const [admin, user] = roles;
    const request = context.switchToHttp().getRequest();
    const { params } = request;
    const { authorization } = request.headers;
    const token = authorization.split(' ').pop();
    const payload = this.jwtService.decode(token);
    const permission = payload ? payload['sub'].permission : null;
    const requesterId = payload ? payload['sub'].requesterId : null;
    const targetId = params.id;

    if (admin && permission === 1) {
      return this.isAdmin();
    }

    if (user) {
      return this.isEqual(requesterId, targetId);
    }

    return false;
  }

  isAdmin(): boolean {
    return true;
  }

  isEqual(requesterId: string, targetId: string): boolean {
    if (requesterId === targetId) {
      return true;
    }

    return false;
  }
}
