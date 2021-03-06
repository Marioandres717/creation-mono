import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UserQueriesResolver } from './resolvers/user-queries.resolver';
import { UserMutationsResolver } from './resolvers/user-mutations.resolver';
import { PrismaService } from '@creation-mono/shared/models';
import { UserService } from './repository/user.service';
import { LoggerService } from '@creation-mono/shared/logger';

@Module({
  imports: [CqrsModule],
  providers: [
    UserQueriesResolver,
    UserMutationsResolver,
    UserService,
    PrismaService,
    LoggerService,
  ],
  exports: [UserService],
})
export class UserModule {}
