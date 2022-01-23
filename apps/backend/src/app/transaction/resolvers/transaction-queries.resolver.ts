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
    return await this.transactionService.count({
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
    return await this.transactionService.findMany(limit, offset, orderBy, {
      ...where,
      userId: user.id,
    });
  }

  @Query('transaction')
  async transaction(
    @Args('transaction') where: TransactionValidationPipe,
    @CurrentUser() user: User
  ): Promise<Transaction> {
    return await this.transactionService.findUnique({
      ...where,
      id_userId: {
        id: where.id,
        userId: user.id,
      },
    });
  }
}
