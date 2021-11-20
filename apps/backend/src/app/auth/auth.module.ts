import { Module } from '@nestjs/common';
import { AuthQueriesResolver } from './resolvers/auth-queries.resolver';

@Module({
  providers: [AuthQueriesResolver]
})
export class AuthModule {}
