import { Module } from '@nestjs/common';
import { TransactionsTagsMutationsResolver } from './resolvers/transactions-tags-mutations.resolver';
import { TransactionsTagsQueriesResolver } from './resolvers/transactions-tags-queries.resolver';
import { SharedModelsModule } from '@creation-mono/shared/models';
import { TransactionsTagsService } from './repository/transactions-tags.service';

@Module({
  imports: [SharedModelsModule],
  providers: [
    TransactionsTagsMutationsResolver,
    TransactionsTagsQueriesResolver,
    TransactionsTagsService,
  ],
})
export class TransactionsTagsModule {}
