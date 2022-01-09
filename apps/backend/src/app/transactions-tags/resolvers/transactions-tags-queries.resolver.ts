import {
  TransactionsTags,
  TransactionsTagsOrderByInput,
} from '@creation-mono/shared/types';
import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { LoggerService } from '@creation-mono/shared/logger';
import { TransactionsTagsService } from '../repository/transactions-tags.service';
import TransactionsTagsValidationPipe from '../validators';

@Resolver('TransactionsTags')
export class TransactionsTagsQueriesResolver {
  constructor(
    private service: TransactionsTagsService,
    private loggerService: LoggerService
  ) {
    this.loggerService.setContext('TransactionTagsQueriesResolver');
  }

  @Query('countTransactionsTags')
  async countTransactionsTags(
    @Args('where') where: TransactionsTagsValidationPipe
  ): Promise<number> {
    return await this.service.count(where);
  }

  @Query('transactionsTags')
  async transactionsTags(
    @Args('limit', { type: () => Int }) limit: number,
    @Args('offset', { type: () => Int }) offset: number,
    @Args('where') where: TransactionsTagsValidationPipe,
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
