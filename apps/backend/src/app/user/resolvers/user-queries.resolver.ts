import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import {
  numberfy,
  omit,
  User,
  User_OrderByInput,
  User_WhereInput,
} from '@creation-mono/shared/types';
import { UserService } from '../repository/user.service';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth-guard';

@Resolver('User')
export class UserQueriesResolver {
  constructor(private userService: UserService) {}

  @Query('count_User')
  @UseGuards(JwtAuthGuard)
  async countUsers(@Args('where') where: User_WhereInput): Promise<number> {
    return await this.userService.countUsers(numberfy(where, ['id', 'active']));
  }

  @Query('User')
  @UseGuards(JwtAuthGuard)
  async user(
    @Args('limit', { type: () => Int }) limit: number,
    @Args('offset', { type: () => Int }) offset: number,
    @Args('where') where: User_WhereInput,
    @Args('orderBy') orderBy: User_OrderByInput
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

  async getUser(where: User_WhereInput): Promise<User[]> {
    const result = (await this.userService.user(
      numberfy(where, ['id'])
    )) as User;
    return result ? [omit(result, ['password'])] : null;
  }

  async getUsers(
    where: User_WhereInput,
    limit: number,
    offset: number,
    orderBy: User_OrderByInput
  ): Promise<User[]> {
    const result = (await this.userService.users(
      limit,
      offset,
      orderBy,
      numberfy(where, ['id', 'active'])
    )) as User[];
    const resultWithoutPasswords = result.map((user) =>
      omit(user, ['password'])
    );
    return resultWithoutPasswords.length ? resultWithoutPasswords : [];
  }
}
