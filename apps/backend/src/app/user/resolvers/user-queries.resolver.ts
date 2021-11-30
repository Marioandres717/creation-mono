import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import {
  User,
  User_OrderByInput,
  User_type,
  User_WhereInput,
} from '@creation-mono/shared/types';
import { UserService } from '../repository/user.service';

@Resolver('User')
export class UserQueriesResolver {
  constructor(private userService: UserService) {}

  @Query('count_User')
  countUsers(): Promise<number> {
    throw new Error('Not Implemented');
  }

  @Query('User')
  async user(
    @Args('limit', { type: () => Int }) limit: number,
    @Args('offset', { type: () => Int }) offset: number,
    @Args('where') where: User_WhereInput,
    @Args('orderBy') orderBy: User_OrderByInput
  ): Promise<User[]> {
    const { id, email, username } = where;
    const getUniqueUser = id || email || username;
    if (getUniqueUser) {
      return await this.getUser(id, email, username);
    } else {
      return await this.getUsers(where, id, limit, offset, orderBy);
    }
  }

  async getUser(id: string, email: string, username: string) {
    const result = (await this.userService.user({
      id: id ? +id : undefined,
      email,
      username,
    })) as User;
    return result ? [result] : null;
  }

  async getUsers(
    where: User_WhereInput,
    id: string,
    limit: number,
    offset: number,
    orderBy: User_OrderByInput
  ) {
    const prismaUserWhereInput = {
      ...where,
      ...{
        id: id ? +id : undefined,
        type: User_type[where.type],
        active: isNaN(Number(where.active)) ? undefined : Number(where.active),
      },
    };
    const result = (await this.userService.users(
      limit,
      offset,
      orderBy,
      prismaUserWhereInput
    )) as User[];
    return result.length ? result : [];
  }
}
