import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from '../repository/user.service';

import {
  User,
  UserRole,
  UserUpdateInput,
  UserWhereUniqueInput,
  UserInsertInput,
} from '@creation-mono/shared/types';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth-guard';

@Resolver('User')
export class UserMutationsResolver {
  constructor(private userService: UserService) {}

  @Mutation('insertUser')
  async insertUser(@Args('user') user: UserInsertInput): Promise<User> {
    const newUser = await this.userService.createUser(user);

    return {
      ...newUser,
      role: UserRole[newUser.role],
    };
  }

  @Mutation('updateUser')
  @UseGuards(JwtAuthGuard)
  async updateUser(
    @Args('user') user: UserUpdateInput,
    @Args('where') where: UserWhereUniqueInput
  ): Promise<User> {
    const updatedUser = await this.userService.updateUser(user, where);

    return {
      ...updatedUser,
      role: UserRole[updatedUser.role],
    };
  }

  @Mutation('deleteUser')
  @UseGuards(JwtAuthGuard)
  async deleteUser(
    @Args('where') where: UserWhereUniqueInput
  ): Promise<boolean> {
    return (await this.userService.deleteUser(where)) ? true : false;
  }
}
