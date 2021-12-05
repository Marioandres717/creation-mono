import { Module } from '@nestjs/common';
import { TransactionMutationsResolver } from './resolvers/transaction-mutations.resolver';
import { TransactionService } from './repository/transaction.service';
import { TransactionQueriesResolver } from './resolvers/transaction-queries.resolver';
import { SharedModelsModule } from '@creation-mono/shared/models';

@Module({
  imports: [SharedModelsModule],
  providers: [
    TransactionMutationsResolver,
    TransactionService,
    TransactionQueriesResolver,
  ],
})
export class TransactionModule {}
