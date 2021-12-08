import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from '../repository/user.service';

import {
  User,
  UserInsertInput,
  UserUpdateInput,
  UserWhereInput,
} from '@creation-mono/shared/types';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth-guard';

@Resolver('User')
export class UserMutationsResolver {
  constructor(private userService: UserService) {}

  @Mutation('insertUser')
  async insertUser(@Args('user') user: UserInsertInput): Promise<User> {
    return await this.userService.createUser(user);
  }

  @Mutation('updateUser')
  @UseGuards(JwtAuthGuard)
  async updateUser(
    @Args('user') user: UserUpdateInput,
    @Args('where') where: UserWhereInput
  ): Promise<User> {
    return await this.userService.updateUser(where, user);
  }

  @Mutation('deleteUser')
  @UseGuards(JwtAuthGuard)
  async deleteUser(@Args('where') where: UserWhereInput): Promise<boolean> {
    let res;
    if (where.id) {
      res = await this.userService.deleteUser(where);
    } else {
      res = await this.userService.deleteUsers(where);
    }
    return res ? true : false;
  }
}
