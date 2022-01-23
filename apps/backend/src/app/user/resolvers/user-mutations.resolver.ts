import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from '../repository/user.service';

import { User } from '@creation-mono/shared/types';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import UserInputValidationPipe from '../validators';
import { LoggerService } from '@creation-mono/shared/logger';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';

@Resolver('User')
@UseGuards(JwtAuthGuard)
export class UserMutationsResolver {
  constructor(
    private userService: UserService,
    private loggerService: LoggerService
  ) {
    this.loggerService.setContext('UserMutationsResolver');
  }

  @Mutation('updateUser')
  async updateUser(
    @Args('user') user: UserInputValidationPipe,
    @Args('where') where: UserInputValidationPipe,
    @CurrentUser() userCtx: User
  ): Promise<User> {
    return await this.userService.update({ ...where, id: userCtx.id }, user);
  }

  @Mutation('deleteUser')
  async deleteUser(
    @Args('where') where: UserInputValidationPipe,
    @CurrentUser() user: User
  ): Promise<boolean> {
    return (await this.userService.delete({ ...where, id: user.id }))
      ? true
      : false;
  }
}
