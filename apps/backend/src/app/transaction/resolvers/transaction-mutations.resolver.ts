import {
  numberfy,
  Transaction,
  Transaction_InsertInput,
  Transaction_UpdateInput,
  Transaction_WhereInput,
  User,
} from '@creation-mono/shared/types';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth-guard';
import { TransactionService } from '../repository/transaction.service';

@Resolver()
@UseGuards(JwtAuthGuard)
export class TransactionMutationsResolver {
  constructor(private transactionService: TransactionService) {}

  @Mutation('insert_Transaction')
  async createTransaction(
    @Args('Transaction') transaction: Transaction_InsertInput,
    @CurrentUser() user: User
  ): Promise<Transaction> {
    const { id, user_id, category_id, ...trans } = transaction;
    const createdTransaction = await this.transactionService.createTransaction({
      ...trans,
      User: { connect: { id: user.id } },
      Category: { connect: { id: category_id } },
    });
    const transactionWithNumberAmount = <Transaction>{
      ...createdTransaction,
      amount: createdTransaction.amount as unknown as number,
    };
    return transactionWithNumberAmount;
  }

  @Mutation('update_Transaction')
  async updateTransaction(
    @Args('Transaction') transaction: Transaction_UpdateInput,
    @Args('where') where: Transaction_WhereInput
  ): Promise<Transaction> {
    const updatedTransaction = await this.transactionService.updateTransaction(
      numberfy(where, ['id', 'user_id']),
      transaction
    );
    const transactionWithNumberAmount = <Transaction>{
      ...updatedTransaction,
      amount: updatedTransaction.amount as unknown as number,
    };
    return transactionWithNumberAmount;
  }

  @Mutation('delete_Transaction')
  async deleteTransaction(
    @Args('where') where: Transaction_WhereInput
  ): Promise<boolean> {
    let res;
    if (where.id) {
      res = await this.transactionService.deleteTransaction(
        numberfy(where, ['id'])
      );
    } else {
      res = await this.transactionService.deleteTransactions(
        numberfy(where, ['id'])
      );
    }
    return res ? true : false;
  }
}
