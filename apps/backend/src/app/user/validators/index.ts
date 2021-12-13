import { User, UserRole } from '@creation-mono/shared/types';
import { IsEmail, IsEnum, IsIn, IsUUID, Matches } from 'class-validator';

export default class UserValidationPipe implements User {
  @IsUUID()
  id: string;

  @IsEmail()
  email: string;

  @Matches(/^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, {
    message:
      'The username must be 4-20 characters long. Only contains alphanumeric characters, underscore and dot.',
  })
  username?: string;

  @IsIn([0, 1])
  isActive?: number;

  @IsEnum(UserRole)
  role?: UserRole;
}
