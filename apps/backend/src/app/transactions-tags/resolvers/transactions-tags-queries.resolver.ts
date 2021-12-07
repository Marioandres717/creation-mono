import {
  numberfy,
  Transactions_Tags,
  Transactions_Tags_OrderByInput,
  Transactions_Tags_WhereInput,
} from '@creation-mono/shared/types';
import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { TransactionsTagsService } from '../repository/transactions-tags.service';

@Resolver('Transactions_Tags')
export class TransactionsTagsQueriesResolver {
  constructor(private service: TransactionsTagsService) {}

  @Query('count_Transactions_Tags')
  async countTransactionsTags(
    @Args('where') where: Transactions_Tags_WhereInput
  ): Promise<number> {
    return await this.service.count(
      numberfy(where, ['id', 'tag_id', 'transaction_id'])
    );
  }

  @Query('Transactions_Tags')
  async Tag(
    @Args('limit', { type: () => Int }) limit: number,
    @Args('offset', { type: () => Int }) offset: number,
    @Args('where') where: Transactions_Tags_WhereInput,
    @Args('orderBy') orderBy: Transactions_Tags_OrderByInput
  ): Promise<Transactions_Tags[]> {
    if (where.id) {
      const res = await this.service.unique(
        numberfy(where, ['id', 'tag_id', 'transaction_id'])
      );
      return res ? [res] : [];
    } else {
      return await this.service.many(
        limit,
        offset,
        orderBy,
        numberfy(where, ['id', 'tag_id', 'transaction_id'])
      );
    }
  }
}
