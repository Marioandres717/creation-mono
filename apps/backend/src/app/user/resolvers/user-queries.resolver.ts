import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import {
  omit,
  User,
  UserOrderByInput,
  UserRole,
  UserWhereInput,
} from '@creation-mono/shared/types';
import { UserService } from '../repository/user.service';
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
      isActive: Number(where.isActive),
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
    const usersWithoutPassword = (
      await this.userService.users(limit, offset, orderBy, {
        ...where,
        isActive: Number(where.isActive),
      })
    ).map((user) =>
      omit(
        {
          ...user,
          role: UserRole[user.role],
          isActive: Boolean(user.isActive),
        },
        ['password']
      )
    );

    return usersWithoutPassword;
  }

  @Query('user')
  @UseGuards(JwtAuthGuard)
  async user(where: UserWhereInput): Promise<User[]> {
    const user = await this.userService.user(where);
    if (!user) return null;
    return [
      omit(
        {
          ...user,
          role: UserRole[user.role],
          isActive: Boolean(user.isActive),
        },
        ['password']
      ),
    ];
  }
}
