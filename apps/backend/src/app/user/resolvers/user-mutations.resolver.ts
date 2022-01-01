import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from '../repository/user.service';

import { User } from '@creation-mono/shared/types';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import UserInputValidationPipe from '../validators';
import { LoggerService } from '../../logger';

@Resolver('User')
@UseGuards(JwtAuthGuard)
export class UserMutationsResolver {
  constructor(
    private userService: UserService,
    private loggerService: LoggerService
  ) {
    this.loggerService.setContext('UserMutationsResolver');
  }

  @Mutation('insertUser')
  async insertUser(@Args('user') user: UserInputValidationPipe): Promise<User> {
    return await this.userService.createUser(user);
  }

  @Mutation('updateUser')
  async updateUser(
    @Args('user') user: UserInputValidationPipe,
    @Args('where') where: UserInputValidationPipe
  ): Promise<User> {
    return await this.userService.updateUser(where, user);
  }

  @Mutation('deleteUser')
  async deleteUser(
    @Args('where') where: UserInputValidationPipe
  ): Promise<boolean> {
    return (await this.userService.deleteUser(where)) ? true : false;
  }
}
