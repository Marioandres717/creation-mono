import {
  Args,
  GraphQLExecutionContext,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';
import { User } from '@creation-mono/shared/types';
import { AuthService } from '../repository/auth.service';
import { Context, CurrentUser } from '../../../common/decorators';
import { JwtAuthGuard } from '../../../common/guards';
import UserValidationPipe from '../../user/validators';
import { matches } from 'class-validator';
import { passwordRegex, passwordValidationErrorMessage } from '../validators';
import { LoggerService } from '@creation-mono/shared/logger';

@Resolver()
export class AuthQueriesResolver {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
    private loggerService: LoggerService
  ) {
    this.loggerService.setContext('AuthQueriesResolver');
  }

  @Query('me')
  @UseGuards(JwtAuthGuard)
  me(@CurrentUser() user: User): User {
    return user;
  }

  @Query('login')
  async login(
    @Args('user') user: UserValidationPipe,
    @Args('password') password: string,
    @Context() context: GraphQLExecutionContext
  ): Promise<User> {
    if (!matches(password, passwordRegex))
      throw new UnauthorizedException(passwordValidationErrorMessage);

    const authenticatedUser = await this.authService.validateUser(
      user,
      password
    );
    const { req } = context.getContext();
    const csrfToken = uuidv4();
    const jwtToken = this.jwtService.sign({
      ...authenticatedUser,
      _csrf: csrfToken,
    });
    req.res.cookie('access-token', jwtToken, {
      httpOnly: true,
      secure: true,
      sameSite: true,
      maxAge: process.env.TOKEN_DURATION,
    });
    req.res.cookie('_csrf', csrfToken, {
      maxAge: process.env.TOKEN_DURATION,
    });
    return authenticatedUser;
  }

  @Query('logout')
  @UseGuards(JwtAuthGuard)
  logout(@Context() context: GraphQLExecutionContext) {
    const { req } = context.getContext();
    req.res.clearCookie('access-token');
    req.res.clearCookie('_csrf');
    return true;
  }
}
