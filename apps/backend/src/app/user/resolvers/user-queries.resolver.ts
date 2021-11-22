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
      const result = (await this.userService.user({
        id: id ? +id : undefined,
        email,
        username,
      })) as User;
      return result ? [result] : null;
    } else {
      const prismaUserWhereInput = {
        ...where,
        ...{
          id: id ? +id : undefined,
          type: User_type[where.type],
          active: isNaN(Number(where.active))
            ? undefined
            : Number(where.active),
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
}
