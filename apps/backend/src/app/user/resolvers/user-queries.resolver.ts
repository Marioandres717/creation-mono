import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import {
  omit,
  User,
  UserOrderByInput,
  UserWhereInput,
} from '@creation-mono/shared/types';
import { UserService } from '../repository/user.service';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth-guard';

@Resolver('User')
export class UserQueriesResolver {
  constructor(private userService: UserService) {}

  @Query('countUser')
  @UseGuards(JwtAuthGuard)
  async countUsers(@Args('where') where: UserWhereInput): Promise<number> {
    return await this.userService.countUsers({
      ...where,
      active: Number(where.active),
    });
  }

  @Query('users')
  @UseGuards(JwtAuthGuard)
  async users(
    @Args('limit', { type: () => Int }) limit: number,
    @Args('offset', { type: () => Int }) offset: number,
    @Args('where') where: UserWhereInput,
    @Args('orderBy') orderBy: UserOrderByInput
  ): Promise<User[]> {
    const { id, email, username } = where;
    const getUniqueUser = id || email || username;
    if (getUniqueUser) {
      return await this.getUser(where);
    } else {
      return await this.getUsers(where, limit, offset, orderBy);
    }
  }

  @Query()
  @UseGuards(JwtAuthGuard)
  me(@CurrentUser() user: User): User {
    return user;
  }

  async getUser(where: UserWhereInput): Promise<User[]> {
    const result = await this.userService.user(where);
    return result ? [omit(result, ['password'])] : null;
  }

  async getUsers(
    where: UserWhereInput,
    limit: number,
    offset: number,
    orderBy: UserOrderByInput
  ): Promise<User[]> {
    const result = await this.userService.users(limit, offset, orderBy, {
      ...where,
      active: Number(where.active),
    });
    const resultWithoutPasswords = result.map((user) =>
      omit(user, ['password'])
    );
    return resultWithoutPasswords.length ? resultWithoutPasswords : [];
  }
}
