import { Module } from '@nestjs/common';
import { TransactionMutationsResolver } from './resolvers/transaction-mutations.resolver';
import { TransactionService } from './repository/transaction.service';
import { TransactionQueriesResolver } from './resolvers/transaction-queries.resolver';
import { PrismaService } from '@creation-mono/shared/models';

@Module({
  providers: [
    TransactionMutationsResolver,
    TransactionService,
    TransactionQueriesResolver,
    PrismaService,
  ],
})
export class TransactionModule {}
