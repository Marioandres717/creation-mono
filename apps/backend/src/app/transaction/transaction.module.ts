import { Module } from '@nestjs/common';
import { TransactionMutationsResolver } from './resolvers/transaction-mutations.resolver';
import { TransactionService } from './repository/transaction.service';
import { TransactionQueriesResolver } from './resolvers/transaction-queries.resolver';
import { PrismaService } from '@creation-mono/shared/models';
import { LoggerService } from '@creation-mono/shared/logger';

@Module({
  providers: [
    TransactionMutationsResolver,
    TransactionService,
    TransactionQueriesResolver,
    PrismaService,
    LoggerService,
  ],
})
export class TransactionModule {}
