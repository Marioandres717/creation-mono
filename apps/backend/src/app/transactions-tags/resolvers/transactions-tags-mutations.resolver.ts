import {
  numberfy,
  Transactions_Tags,
  Transactions_Tags_InsertInput,
  Transactions_Tags_UpdateInput,
  Transactions_Tags_WhereInput,
} from '@creation-mono/shared/types';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth-guard';
import { TransactionsTagsService } from '../repository/transactions-tags.service';

@Resolver()
@UseGuards(JwtAuthGuard)
export class TransactionsTagsMutationsResolver {
  constructor(private service: TransactionsTagsService) {}

  @Mutation('insert_Transactions_Tags')
  async createTransactionsTags(
    @Args('Transactions_Tags') data: Transactions_Tags_InsertInput
  ): Promise<Transactions_Tags> {
    return await this.service.add(
      numberfy(data, ['id', 'tag_id', 'transaction_id'])
    );
  }

  @Mutation('update_Transactions_Tags')
  async updateTransactionsTags(
    @Args('Transactions_Tags') data: Transactions_Tags_UpdateInput,
    @Args('where') where: Transactions_Tags_WhereInput
  ): Promise<Transactions_Tags> {
    return await this.service.update(
      numberfy(where, ['id', 'tag_id', 'transaction_id']),
      {
        Tag: { connect: { id: data.tag_id } },
        Transaction: { connect: { id: data.transaction_id } },
      }
    );
  }

  @Mutation('delete_Transactions_Tags')
  async deleteTransactionsTags(
    @Args('where') where: Transactions_Tags_WhereInput
  ): Promise<boolean> {
    let res;
    if (where.id) {
      res = await this.service.delete(
        numberfy(where, ['id', 'tag_id', 'transaction_id'])
      );
    } else {
      res = await this.service.deleteMany(
        numberfy(where, ['id', 'tag_id', 'transaction_id'])
      );
    }

    return res ? true : false;
  }
}
