import {
  TransactionsTags,
  TransactionsTagsInsertInput,
  TransactionsTagsUpdateInput,
  TransactionsTagsWhereInput,
} from '@creation-mono/shared/types';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth-guard';
import { TransactionsTagsService } from '../repository/transactions-tags.service';

@Resolver('TransactionTags')
@UseGuards(JwtAuthGuard)
export class TransactionsTagsMutationsResolver {
  constructor(private service: TransactionsTagsService) {}

  @Mutation('insertTransactionsTags')
  async createTransactionsTags(
    @Args('transactionsTags') data: TransactionsTagsInsertInput
  ): Promise<TransactionsTags> {
    return await this.service.add(data);
  }

  @Mutation('updateTransactionsTags')
  async updateTransactionsTags(
    @Args('transactionsTags') data: TransactionsTagsUpdateInput,
    @Args('where') where: TransactionsTagsWhereInput
  ): Promise<TransactionsTags> {
    return await this.service.update(where, {
      Tag: { connect: { id: data.tagId } },
      Transaction: { connect: { id: data.transactionId } },
    });
  }

  @Mutation('deleteTransactionsTags')
  async deleteTransactionsTags(
    @Args('where') where: TransactionsTagsWhereInput
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
