import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from '../repository/user.service';

import { User_InsertInput } from '@creation-mono/shared/types';

@Resolver()
export class UserMutationsResolver {
  constructor(private userService: UserService) {}
  @Mutation('insert_User')
  async createUser(@Args('User') user: User_InsertInput) {
    return await this.userService.createUser(user);
  }
}
