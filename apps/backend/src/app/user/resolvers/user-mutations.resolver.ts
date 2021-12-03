import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from '../repository/user.service';

import {
  User,
  User_InsertInput,
  User_UpdateInput,
  User_WhereInput,
} from '@creation-mono/shared/types';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth-guard';

@Resolver()
export class UserMutationsResolver {
  constructor(private userService: UserService) {}
  @Mutation('insert_User')
  @UseGuards(JwtAuthGuard)
  async createUser(@Args('User') user: User_InsertInput): Promise<User> {
    return (await this.userService.createUser(user)) as User;
  }

  @Mutation('update_User')
  @UseGuards(JwtAuthGuard)
  async updateUser(
    @Args('User') user: User_UpdateInput,
    @Args('where') where: User_WhereInput
  ): Promise<User> {
    return (await this.userService.updateUser(
      { ...where, id: +where.id },
      user
    )) as User;
  }

  @Mutation('delete_User')
  @UseGuards(JwtAuthGuard)
  async deleteUser(@Args('where') where: User_WhereInput): Promise<boolean> {
    const successfulOperation = await this.userService.deleteUser({
      ...where,
      id: +where.id,
    });
    return successfulOperation ? true : false;
  }
}
