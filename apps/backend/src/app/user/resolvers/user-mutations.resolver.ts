import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from '../repository/user.service';

import { User, UserRole } from '@creation-mono/shared/types';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth-guard';
import UserInputValidationPipe from '../validators';

@Resolver('User')
export class UserMutationsResolver {
  constructor(private userService: UserService) {}

  @Mutation('insertUser')
  async insertUser(@Args('user') user: UserInputValidationPipe): Promise<User> {
    const newUser = await this.userService.createUser(user);

    return {
      ...newUser,
      role: UserRole[newUser.role],
    };
  }

  @Mutation('updateUser')
  @UseGuards(JwtAuthGuard)
  async updateUser(
    @Args('user') user: UserInputValidationPipe,
    @Args('where') where: UserInputValidationPipe
  ): Promise<User> {
    const updatedUser = await this.userService.updateUser(where, user);

    return {
      ...updatedUser,
      role: UserRole[updatedUser.role],
    };
  }

  @Mutation('deleteUser')
  @UseGuards(JwtAuthGuard)
  async deleteUser(
    @Args('where') where: UserInputValidationPipe
  ): Promise<boolean> {
    return (await this.userService.deleteUser(where)) ? true : false;
  }
}
