import { Module } from '@nestjs/common';
import { UserQueriesResolver } from './resolvers/user-queries.resolver';
import { UserMutationsResolver } from './resolvers/user-mutations.resolver';

@Module({
  providers: [UserQueriesResolver, UserMutationsResolver]
})
export class UserModule {}
