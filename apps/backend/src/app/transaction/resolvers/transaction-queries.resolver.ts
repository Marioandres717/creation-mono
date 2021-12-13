import {
  Transaction,
  TransactionOrderByInput,
} from '@creation-mono/shared/types';
import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { TransactionService } from '../repository/transaction.service';
import TransactionValidationPipe from '../validators';

@Resolver('Transaction')
export class TransactionQueriesResolver {
  constructor(private transactionService: TransactionService) {}

  @Query('countTransaction')
  async countCategories(
    @Args('where') where: TransactionValidationPipe
  ): Promise<number> {
    return await this.transactionService.countTransactions(where);
  }

  @Query('transactions')
  async transactions(
    @Args('limit', { type: () => Int }) limit: number,
    @Args('offset', { type: () => Int }) offset: number,
    @Args('where') where: TransactionValidationPipe,
    @Args('orderBy') orderBy: TransactionOrderByInput
  ): Promise<Transaction[]> {
    if (where.id) {
      const transaction = await this.transactionService.transaction(where);
      if (!transaction) return [];
      const transactionWithNumberAmount = <Transaction>{
        ...transaction,
        amount: transaction.amount as unknown as number,
      };
      return [transactionWithNumberAmount];
    } else {
      const transactions = (
        await this.transactionService.transactions(
          limit,
          offset,
          orderBy,
          where
        )
      ).map(
        (transaction) =>
          <Transaction>{
            ...transaction,
            amount: transaction.amount as unknown as number,
          }
      );

      return transactions;
    }
  }
}
