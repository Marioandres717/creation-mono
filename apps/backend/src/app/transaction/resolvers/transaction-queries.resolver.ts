import {
  Transaction,
  TransactionOrderByInput,
  User,
} from '@creation-mono/shared/types';
import { UseGuards } from '@nestjs/common';
import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { LoggerService } from '@creation-mono/shared/logger';
import { TransactionService } from '../repository/transaction.service';
import TransactionValidationPipe from '../validators';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';

@Resolver('Transaction')
@UseGuards(JwtAuthGuard)
export class TransactionQueriesResolver {
  constructor(
    private transactionService: TransactionService,
    private loggerService: LoggerService
  ) {
    this.loggerService.setContext('TransactionQueriesResolver');
  }

  @Query('countTransaction')
  async countCategories(
    @Args('where') where: TransactionValidationPipe,
    @CurrentUser() user: User
  ): Promise<number> {
    return await this.transactionService.countTransactions({
      ...where,
      userId: user.id,
    });
  }

  @Query('transactions')
  async transactions(
    @Args('limit', { type: () => Int }) limit: number,
    @Args('offset', { type: () => Int }) offset: number,
    @Args('where') where: TransactionValidationPipe,
    @Args('orderBy') orderBy: TransactionOrderByInput,
    @CurrentUser() user: User
  ): Promise<Transaction[]> {
    const transactions = (
      await this.transactionService.transactions(limit, offset, orderBy, {
        ...where,
        userId: user.id,
      })
    ).map((transaction) => ({
      ...transaction,
      amount: transaction.amount as unknown as number,
    }));

    return transactions;
  }

  @Query('transaction')
  async transaction(
    @Args('transaction') where: TransactionValidationPipe,
    @CurrentUser() user: User
  ): Promise<Transaction> {
    const transaction = await this.transactionService.transaction({
      ...where,
      userId: user.id,
    });
    return {
      ...transaction,
      amount: transaction.amount as unknown as number,
    };
  }
}
