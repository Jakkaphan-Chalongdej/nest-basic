import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>('role', context.getHandler());
    const request = context.switchToHttp().getRequest<any>();
    const jwtPayloadData = request.user;
    if (!roles || roles.length === 0) {
      return true;
    }
    if (roles.includes(jwtPayloadData.userType)) {
      return true;
    }

    return false;
  }
}
