import {
  Args,
  GraphQLExecutionContext,
  Query,
  Resolver,
} from '@nestjs/graphql';
import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';
import { User, UserRole, UserWhereInput } from '@creation-mono/shared/types';
import { AuthService } from '../repository/auth.service';
import { Context } from '../decorators/context.decorator';
import { JwtAuthGuard } from '../guards/jwt-auth-guard';
import { CurrentUser } from '../decorators/current-user.decorator';

@Resolver()
export class AuthQueriesResolver {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService
  ) {}

  @Query()
  @UseGuards(JwtAuthGuard)
  me(@CurrentUser() user: User): User {
    return user;
  }

  @Query('login')
  async login(
    @Args('user') user: UserWhereInput,
    @Context() context: GraphQLExecutionContext
  ): Promise<User> {
    const authenticatedUser = await this.authService.validateUser(
      user,
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
    return {
      ...authenticatedUser,
      role: UserRole[authenticatedUser.role],
      isActive: Boolean(authenticatedUser.isActive),
    };
  }
}
