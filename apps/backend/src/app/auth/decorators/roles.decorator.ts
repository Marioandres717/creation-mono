import { SetMetadata } from '@nestjs/common';

export enum APP_ROLES {
  admin = 'admin',
  basic = 'basic',
}
export const ROLES_KEY = 'roles';
export const Roles = (...roles: APP_ROLES[]) => SetMetadata(ROLES_KEY, roles);
