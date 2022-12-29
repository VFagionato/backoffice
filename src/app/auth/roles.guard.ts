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
      this.isUser(requesterId, targetId, request);
    }

    return false;
  }

  isAdmin(): boolean {
    return true;
  }

  isUser(requesterId: string, targetId: string, request: any): boolean {
    const { permission } = request.body;

    if (permission) {
      return false;
    }

    if (requesterId !== targetId) {
      return false;
    }

    return true;
  }
}
