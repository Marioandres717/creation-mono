import { SetMetadata } from '@nestjs/common';

export enum AppRoles {
  ADMIN = 'admin',
  BASIC = 'basic',
}
export const ROLES_KEY = 'roles';
export const Roles = (...roles: AppRoles[]) => SetMetadata(ROLES_KEY, roles);
