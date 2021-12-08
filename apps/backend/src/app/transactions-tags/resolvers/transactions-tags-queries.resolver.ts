import {
  TransactionsTags,
  TransactionsTagsOrderByInput,
  TransactionsTagsWhereInput,
} from '@creation-mono/shared/types';
import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { TransactionsTagsService } from '../repository/transactions-tags.service';

@Resolver('TransactionsTags')
export class TransactionsTagsQueriesResolver {
  constructor(private service: TransactionsTagsService) {}

  @Query('countTransactionsTags')
  async countTransactionsTags(
    @Args('where') where: TransactionsTagsWhereInput
  ): Promise<number> {
    return await this.service.count(where);
  }

  @Query('transactionsTags')
  async transactionsTags(
    @Args('limit', { type: () => Int }) limit: number,
    @Args('offset', { type: () => Int }) offset: number,
    @Args('where') where: TransactionsTagsWhereInput,
    @Args('orderBy') orderBy: TransactionsTagsOrderByInput
  ): Promise<TransactionsTags[]> {
    if (where.id) {
      const res = await this.service.unique(where);
      return res ? [res] : [];
    } else {
      return await this.service.many(limit, offset, orderBy, where);
    }
  }
}
