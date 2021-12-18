import { Transaction, User } from '@creation-mono/shared/types';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { TransactionService } from '../repository/transaction.service';
import TransactionValidationPipe from '../validators';

@Resolver('Transaction')
@UseGuards(JwtAuthGuard)
export class TransactionMutationsResolver {
  constructor(private transactionService: TransactionService) {}

  @Mutation('insertTransaction')
  async insertTransaction(
    @Args('transaction') transaction: TransactionValidationPipe,
    @CurrentUser() user: User
  ): Promise<Transaction> {
    const { categoryId, ...trans } = transaction;
    return await this.transactionService.createTransaction({
      ...trans,
      user: { connect: { id: user.id } },
      category: { connect: { id: categoryId } },
    });
  }

  @Mutation('updateTransaction')
  async updateTransaction(
    @Args('transaction') transaction: TransactionValidationPipe,
    @Args('where') where: TransactionValidationPipe
  ): Promise<Transaction> {
    return await this.transactionService.updateTransaction(where, transaction);
  }

  @Mutation('deleteTransaction')
  async deleteTransaction(
    @Args('where') where: TransactionValidationPipe
  ): Promise<boolean> {
    let res;
    if (where.id) {
      res = await this.transactionService.deleteTransaction(where);
    } else {
      res = await this.transactionService.deleteTransactions(where);
    }
    return res ? true : false;
  }
}
