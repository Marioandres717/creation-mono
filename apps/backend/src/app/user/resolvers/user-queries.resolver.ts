import { Query, Resolver } from '@nestjs/graphql';

@Resolver('User')
export class UserQueriesResolver {
  @Query('count_User')
  countUsers(): Promise<number> {
    throw new Error('Not Implemented');
  }
}
