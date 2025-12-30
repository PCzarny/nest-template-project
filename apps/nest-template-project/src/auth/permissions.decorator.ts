import { SetMetadata } from '@nestjs/common';

export enum Permission {
  CREATE_USER = 'create:user',
  READ_USER = 'read:user',
  UPDATE_USER = 'update:user',
  DELETE_USER = 'delete:user',
  CREATE_REPORT = 'create:report',
  READ_REPORT = 'read:report',
  UPDATE_REPORT = 'update:report',
  DELETE_REPORT = 'delete:report',
}

export const PERMISSIONS_KEY = 'permission';
export const RequirePermissions = (permission: Permission) =>
  SetMetadata(PERMISSIONS_KEY, permission);
