import {
  numberfy,
  Transaction,
  Transaction_OrderByInput,
  Transaction_WhereInput,
} from '@creation-mono/shared/types';
import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { TransactionService } from '../repository/transaction.service';

@Resolver()
export class TransactionQueriesResolver {
  constructor(private transactionService: TransactionService) {}

  @Query('count_Transaction')
  async countCategories(
    @Args('where') where: Transaction_WhereInput
  ): Promise<number> {
    return await this.transactionService.countTransactions(
      numberfy(where, ['id', 'user_id'])
    );
  }

  @Query('Transaction')
  async Tag(
    @Args('limit', { type: () => Int }) limit: number,
    @Args('offset', { type: () => Int }) offset: number,
    @Args('where') where: Transaction_WhereInput,
    @Args('orderBy') orderBy: Transaction_OrderByInput
  ): Promise<Transaction[]> {
    if (where.id) {
      const transaction = await this.transactionService.transaction(
        numberfy(where, ['id', 'user_id'])
      );
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
