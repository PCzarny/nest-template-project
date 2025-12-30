import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { PERMISSIONS_KEY, Permission } from './permissions.decorator';
import { Role } from 'generated/prisma';

// TODO: Consider extracting
const PERMISSIONS_MAP: Record<Role, Permission[]> = {
  [Role.ADMIN]: Object.values(Permission),
  [Role.MANAGER]: Object.values(Permission),
  [Role.OPERATOR]: [Permission.READ_USER],
  [Role.VIEWER]: [Permission.READ_USER],
};

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermission = this.reflector.getAllAndOverride<Permission>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredPermission) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest<Request>();
    if (!user) {
      return false;
    }

    return PERMISSIONS_MAP[user.role].includes(requiredPermission);
  }
}
