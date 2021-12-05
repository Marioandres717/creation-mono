import {
  Args,
  GraphQLExecutionContext,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { UnauthorizedException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';
import { User_WhereInput } from '@creation-mono/shared/types';
import { AuthService } from '../repository/auth.service';
import { Context } from '../decorators/context.decorator';

@Resolver()
export class AuthQueriesResolver {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService
  ) {}

  @Query('login')
  async login(
    @Args('user') user: User_WhereInput,
    @Context() context: GraphQLExecutionContext
  ) {
    const authenticatedUser = await this.authService.validateUser(
      {
        ...user,
        id: +user.id,
      },
      user.password
    );

    if (!authenticatedUser) throw new UnauthorizedException();

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
      maxAge: process.env.TOKEN_DURATION, //30 min
    });
    req.res.cookie('_csrf', csrfToken, {
      maxAge: process.env.TOKEN_DURATION,
    });
    return authenticatedUser;
  }
}
