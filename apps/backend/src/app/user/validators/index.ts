import { User } from '@creation-mono/shared/types';
import { IsEmail, IsIn, IsUUID, Matches } from 'class-validator';

export const usernameRegex =
  /^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/;

export const usernameValidationErrorMessage =
  'Username must be 4-20 characters long. Only contains alphanumeric characters, underscore and dot.';
export default class UserValidationPipe implements User {
  @IsUUID()
  id: string;

  @IsEmail()
  email: string;

  @Matches(usernameRegex, {
    message: usernameValidationErrorMessage,
  })
  username?: string;

  @IsIn([0, 1])
  isActive?: number;
}
