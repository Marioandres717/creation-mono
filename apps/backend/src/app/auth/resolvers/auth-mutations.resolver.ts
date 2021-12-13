import { User } from '@creation-mono/shared/types';
import { UnauthorizedException } from '@nestjs/common';
import { Mutation, Resolver } from '@nestjs/graphql';
import { matches } from 'class-validator';
import UserValidationPipe from '../../user/validators';
import { AuthService } from '../repository/auth.service';
import { passwordRegex, passwordValidationErrorMessage } from '../validators';

@Resolver()
export class AuthMutationsResolver {
  constructor(private authService: AuthService) {}

  @Mutation('signUp')
  async signUp(user: UserValidationPipe, password: string): Promise<User> {
    if (!matches(password, passwordRegex))
      throw new UnauthorizedException(passwordValidationErrorMessage);
    return (await this.authService.registerUser(user, password)) as User;
  }
}
