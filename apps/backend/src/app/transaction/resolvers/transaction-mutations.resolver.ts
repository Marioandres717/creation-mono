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
    const { id, userId, categoryId, isExpense, ...trans } = transaction;
    const createdTransaction = await this.transactionService.createTransaction({
      ...trans,
      isExpense: Number(isExpense),
      User: { connect: { id: user.id } },
      Category: { connect: { id: categoryId } },
    });
    const transactionWithNumberAmount = <Transaction>{
      ...createdTransaction,
      amount: createdTransaction.amount as unknown as number,
      isExpense: Boolean(createdTransaction.isExpense),
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
      { ...transaction, isExpense: Number(transaction.isExpense) }
    );
    const transactionWithNumberAmount = <Transaction>{
      ...updatedTransaction,
      amount: updatedTransaction.amount as unknown as number,
      isExpense: Boolean(updatedTransaction.isExpense),
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
        isExpense: Number(where.isExpense),
      });
    }
    return res ? true : false;
  }
}
