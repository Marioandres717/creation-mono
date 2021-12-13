import { TransactionsTags } from '@creation-mono/shared/types';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth-guard';
import { TransactionsTagsService } from '../repository/transactions-tags.service';
import TransactionsTagsValidationPipe from '../validators';

@Resolver('TransactionTags')
@UseGuards(JwtAuthGuard)
export class TransactionsTagsMutationsResolver {
  constructor(private service: TransactionsTagsService) {}

  @Mutation('insertTransactionsTags')
  async createTransactionsTags(
    @Args('transactionsTags') data: TransactionsTagsValidationPipe
  ): Promise<TransactionsTags> {
    return await this.service.add({
      Tag: { connect: { id: data.tagId } },
      Transaction: { connect: { id: data.transactionId } },
    });
  }

  @Mutation('updateTransactionsTags')
  async updateTransactionsTags(
    @Args('transactionsTags') data: TransactionsTagsValidationPipe,
    @Args('where') where: TransactionsTagsValidationPipe
  ): Promise<TransactionsTags> {
    return await this.service.update(where, {
      Tag: { connect: { id: data.tagId } },
      Transaction: { connect: { id: data.transactionId } },
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
