import { Module } from '@nestjs/common';
import { UserQueriesResolver } from './resolvers/user-queries.resolver';
import { UserMutationsResolver } from './resolvers/user-mutations.resolver';
import { SharedModelsModule } from '@creation-mono/shared/models';
import { UserService } from './repository/user.service';

@Module({
  imports: [SharedModelsModule],
  providers: [UserQueriesResolver, UserMutationsResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
