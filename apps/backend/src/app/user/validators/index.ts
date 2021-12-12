import {
  UserInsertInput as InsertInput,
  UserRole,
} from '@creation-mono/shared/types';
import { IsEmail, IsAlphanumeric, IsIn, IsUUID } from 'class-validator';

export class UserInsertInput implements InsertInput {
  @IsUUID()
  id?: string;

  @IsIn([0, 1])
  isActive?: number;

  @IsEmail()
  email: string;

  @IsAlphanumeric()
  username?: string;

  @IsIn([UserRole.admin, UserRole.basic])
  role?: UserRole;
}
