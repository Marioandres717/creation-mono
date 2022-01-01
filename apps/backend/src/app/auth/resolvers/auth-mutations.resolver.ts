import { User } from '@creation-mono/shared/types';
import { UnauthorizedException } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { matches } from 'class-validator';
import { LoggerService } from '../../logger';
import UserValidationPipe from '../../user/validators';
import { AuthService } from '../repository/auth.service';
import { passwordRegex, passwordValidationErrorMessage } from '../validators';

@Resolver()
export class AuthMutationsResolver {
  constructor(
    private authService: AuthService,
    private loggerService: LoggerService
  ) {
    this.loggerService.setContext('AuthMutationsResolver');
  }

  @Mutation('signUp')
  async signUp(
    @Args('user') user: UserValidationPipe,
    @Args('password') password: string
  ): Promise<User> {
    if (!matches(password, passwordRegex))
      throw new UnauthorizedException(passwordValidationErrorMessage);
    return (await this.authService.registerUser(user, password)) as User;
  }
}
