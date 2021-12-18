import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { User, UserOrderByInput } from '@creation-mono/shared/types';
import { UserService } from '../repository/user.service';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import UserInputValidationPipe from '../validators';
import { APP_ROLES, Roles } from '../../auth/decorators/roles.decorator';
import { RolesGuard } from '../../auth/guards/roles.guard';

@Resolver('User')
@UseGuards(JwtAuthGuard)
export class UserQueriesResolver {
  constructor(private userService: UserService) {}

  @Query('countUser')
  async countUsers(
    @Args('where') where: UserInputValidationPipe
  ): Promise<number> {
    return await this.userService.countUsers(where);
  }

  @Query('users')
  @Roles(APP_ROLES.admin)
  @UseGuards(RolesGuard)
  async users(
    @Args('limit', { type: () => Int }) limit: number,
    @Args('offset', { type: () => Int }) offset: number,
    @Args('where') where: UserInputValidationPipe,
    @Args('orderBy') orderBy: UserOrderByInput
  ): Promise<User[]> {
    return await this.userService.users(limit, offset, orderBy, where);
  }

  @Query('user')
  async user(@Args('where') where: UserInputValidationPipe): Promise<User> {
    return await this.userService.user(where);
  }
}
