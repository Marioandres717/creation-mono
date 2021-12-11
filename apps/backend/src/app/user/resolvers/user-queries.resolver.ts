import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import {
  User,
  UserOrderByInput,
  UserRole,
  UserWhereInput,
} from '@creation-mono/shared/types';
import { UserService } from '../repository/user.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth-guard';

@Resolver('User')
@UseGuards(JwtAuthGuard)
export class UserQueriesResolver {
  constructor(private userService: UserService) {}

  @Query('countUser')
  async countUsers(@Args('where') where: UserWhereInput): Promise<number> {
    return await this.userService.countUsers(where);
  }

  @Query('users')
  async users(
    @Args('limit', { type: () => Int }) limit: number,
    @Args('offset', { type: () => Int }) offset: number,
    @Args('where') where: UserWhereInput,
    @Args('orderBy') orderBy: UserOrderByInput
  ): Promise<User[]> {
    const users = (
      await this.userService.users(limit, offset, orderBy, where)
    ).map((user) => ({
      ...user,
      role: UserRole[user.role],
    }));

    return users;
  }

  @Query('user')
  async user(where: UserWhereInput): Promise<User> {
    const user = await this.userService.user(where);
    if (!user) return null;
    return {
      ...user,
      role: UserRole[user.role],
    };
  }
}
