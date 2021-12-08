import {
  Transaction,
  TransactionInsertInput,
  TransactionUpdateInput,
  TransactionWhereInput,
  User,
} from '@creation-mono/shared/types';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth-guard';
import { TransactionService } from '../repository/transaction.service';

@Resolver('Transaction')
@UseGuards(JwtAuthGuard)
export class TransactionMutationsResolver {
  constructor(private transactionService: TransactionService) {}

  @Mutation('insertTransaction')
  async insertTransaction(
    @Args('transaction') transaction: TransactionInsertInput,
    @CurrentUser() user: User
  ): Promise<Transaction> {
    const { id, userId, categoryId, expense, ...trans } = transaction;
    const createdTransaction = await this.transactionService.createTransaction({
      ...trans,
      expense: Number(expense),
      User: { connect: { id: user.id } },
      Category: { connect: { id: categoryId } },
    });
    const transactionWithNumberAmount = <Transaction>{
      ...createdTransaction,
      amount: createdTransaction.amount as unknown as number,
    };
    return transactionWithNumberAmount;
  }

  @Mutation('updateTransaction')
  async updateTransaction(
    @Args('transaction') transaction: TransactionUpdateInput,
    @Args('where') where: TransactionWhereInput
  ): Promise<Transaction> {
    const updatedTransaction = await this.transactionService.updateTransaction(
      where,
      { ...transaction, expense: Number(transaction.expense) }
    );
    const transactionWithNumberAmount = <Transaction>{
      ...updatedTransaction,
      amount: updatedTransaction.amount as unknown as number,
    };
    return transactionWithNumberAmount;
  }

  @Mutation('deleteTransaction')
  async deleteTransaction(
    @Args('where') where: TransactionWhereInput
  ): Promise<boolean> {
    let res;
    if (where.id) {
      res = await this.transactionService.deleteTransaction(where);
    } else {
      res = await this.transactionService.deleteTransactions({
        ...where,
        expense: Number(where.expense),
      });
    }
    return res ? true : false;
  }
}
