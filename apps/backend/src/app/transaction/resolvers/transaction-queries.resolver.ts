import {
  Transaction,
  TransactionOrderByInput,
  TransactionWhereInput,
} from '@creation-mono/shared/types';
import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { TransactionService } from '../repository/transaction.service';

@Resolver('Transaction')
export class TransactionQueriesResolver {
  constructor(private transactionService: TransactionService) {}

  @Query('countTransaction')
  async countCategories(
    @Args('where') where: TransactionWhereInput
  ): Promise<number> {
    return await this.transactionService.countTransactions({
      ...where,
      expense: Number(where.expense),
    });
  }

  @Query('transactions')
  async transactions(
    @Args('limit', { type: () => Int }) limit: number,
    @Args('offset', { type: () => Int }) offset: number,
    @Args('where') where: TransactionWhereInput,
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
      const transactions = await this.transactionService.transactions(
        limit,
        offset,
        orderBy,
        numberfy(where, ['id', 'user_id'])
      );
      const transactionsWithNumberAmount = transactions.map(
        (transaction) =>
          <Transaction>{
            ...transaction,
            amount: transaction.amount as unknown as number,
          }
      );

      return transactionsWithNumberAmount;
    }
  }
}
