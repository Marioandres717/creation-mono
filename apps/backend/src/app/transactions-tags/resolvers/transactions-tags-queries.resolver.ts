import {
  TransactionsTags,
  TransactionsTagsOrderByInput,
  User,
} from '@creation-mono/shared/types';
import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { LoggerService } from '@creation-mono/shared/logger';
import { TransactionsTagsService } from '../repository/transactions-tags.service';
import TransactionsTagsValidationPipe from '../validators';
import { CurrentUser } from '../../../common/decorators';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../../common/guards';

@Resolver('TransactionsTags')
@UseGuards(JwtAuthGuard)
export class TransactionsTagsQueriesResolver {
  constructor(
    private transactionTagsService: TransactionsTagsService,
    private loggerService: LoggerService
  ) {
    this.loggerService.setContext('TransactionTagsQueriesResolver');
  }

  @Query('countTransactionsTags')
  async countTransactionsTags(
    @Args('where') where: TransactionsTagsValidationPipe,
    @CurrentUser() user: User
  ): Promise<number> {
    return await this.transactionTagsService.count({
      ...where,
      transaction: { userId: user.id },
    });
  }

  @Query('transactionsTags')
  async transactionsTags(
    @Args('where') where: TransactionsTagsValidationPipe,
    @CurrentUser() user: User
  ): Promise<TransactionsTags> {
    return await this.transactionTagsService.findUnique({
      ...where,
      transaction: { userId: user.id },
      tag: { userId: user.id },
    });
  }

  @Query('manyTransactionTags')
  async manyTransactionTags(
    @Args('limit', { type: () => Int }) limit: number,
    @Args('offset', { type: () => Int }) offset: number,
    @Args('where') where: TransactionsTagsValidationPipe,
    @Args('orderBy') orderBy: TransactionsTagsOrderByInput,
    @CurrentUser() user: User
  ) {
    return await this.transactionTagsService.findMany(limit, offset, orderBy, {
      ...where,
      transaction: { userId: user.id },
      tag: { userId: user.id },
    });
  }
}
