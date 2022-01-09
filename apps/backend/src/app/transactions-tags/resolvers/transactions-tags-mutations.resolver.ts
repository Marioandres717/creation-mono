import { TransactionsTags } from '@creation-mono/shared/types';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { LoggerService } from '@creation-mono/shared/logger';
import { TransactionsTagsService } from '../repository/transactions-tags.service';
import TransactionsTagsValidationPipe from '../validators';

@Resolver('TransactionTags')
@UseGuards(JwtAuthGuard)
export class TransactionsTagsMutationsResolver {
  constructor(
    private service: TransactionsTagsService,
    private loggerService: LoggerService
  ) {
    this.loggerService.setContext('TransactionTagsMutationsResolver');
  }

  @Mutation('insertTransactionsTags')
  async createTransactionsTags(
    @Args('transactionsTags') data: TransactionsTagsValidationPipe
  ): Promise<TransactionsTags> {
    return await this.service.add({
      tag: { connect: { id: data.tagId } },
      transaction: { connect: { id: data.transactionId } },
    });
  }

  @Mutation('updateTransactionsTags')
  async updateTransactionsTags(
    @Args('transactionsTags') data: TransactionsTagsValidationPipe,
    @Args('where') where: TransactionsTagsValidationPipe
  ): Promise<TransactionsTags> {
    return await this.service.update(where, {
      tag: data.tagId ? { connect: { id: data.tagId } } : undefined,
      transaction: data.transactionId
        ? { connect: { id: data.transactionId } }
        : undefined,
    });
  }

  @Mutation('deleteTransactionsTags')
  async deleteTransactionsTags(
    @Args('where') where: TransactionsTagsValidationPipe
  ): Promise<boolean> {
    let res;
    if (where.id) {
      res = await this.service.delete(where);
    } else {
      res = await this.service.deleteMany(where);
    }

    return res ? true : false;
  }
}
