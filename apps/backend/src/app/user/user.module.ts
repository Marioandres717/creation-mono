import { Module } from '@nestjs/common';
import { UserQueriesResolver } from './resolvers/user-queries.resolver';
import { UserMutationsResolver } from './resolvers/user-mutations.resolver';
import { PrismaService } from '@creation-mono/shared/models';
import { UserService } from './repository/user.service';

@Module({
  providers: [
    UserQueriesResolver,
    UserMutationsResolver,
    UserService,
    PrismaService,
  ],
  exports: [UserService],
})
export class UserModule {}
