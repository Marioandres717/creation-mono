import { Module } from '@nestjs/common';
import { TransactionsTagsMutationsResolver } from './resolvers/transactions-tags-mutations.resolver';
import { TransactionsTagsQueriesResolver } from './resolvers/transactions-tags-queries.resolver';
import { PrismaService } from '@creation-mono/shared/models';
import { TransactionsTagsService } from './repository/transactions-tags.service';

@Module({
  providers: [
    TransactionsTagsMutationsResolver,
    TransactionsTagsQueriesResolver,
    TransactionsTagsService,
    PrismaService,
  ],
})
export class TransactionsTagsModule {}
