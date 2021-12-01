import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from '../repository/user.service';

import { User } from '@creation-mono/shared/types';

@Resolver()
export class UserMutationsResolver {
  constructor(private userService: UserService) {}
  @Mutation()
  async CreateUser(@Args() user: Partial<User>) {
    const createdUser = await this.userService.createUser(user);
    return createdUser;
  }
}
