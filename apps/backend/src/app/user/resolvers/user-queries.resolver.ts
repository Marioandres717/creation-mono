import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { User, UserOrderByInput } from '@creation-mono/shared/types';
import { UserService } from '../repository/user.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard, RolesGuard } from '../../../common/guards';
import UserInputValidationPipe from '../validators';
import { AppRoles, Roles } from '../../../common/decorators';
import { LoggerService } from '@creation-mono/shared/logger';

@Resolver('User')
@UseGuards(JwtAuthGuard)
export class UserQueriesResolver {
  constructor(
    private userService: UserService,
    private loggerService: LoggerService
  ) {
    this.loggerService.setContext('UserQueriesResolver');
  }

  @Query('countUser')
  @Roles(AppRoles.ADMIN)
  @UseGuards(RolesGuard)
  async countUsers(
    @Args('where') where: UserInputValidationPipe
  ): Promise<number> {
    return await this.userService.count(where);
  }

  @Query('users')
  @Roles(AppRoles.ADMIN)
  @UseGuards(RolesGuard)
  async users(
    @Args('limit', { type: () => Int }) limit: number,
    @Args('offset', { type: () => Int }) offset: number,
    @Args('where') where: UserInputValidationPipe,
    @Args('orderBy') orderBy: UserOrderByInput
  ): Promise<User[]> {
    return await this.userService.findMany(limit, offset, orderBy, where);
  }

  @Query('user')
  @Roles(AppRoles.ADMIN)
  @UseGuards(RolesGuard)
  async user(@Args('where') where: UserInputValidationPipe): Promise<User> {
    return await this.userService.findUnique(where);
  }
}
