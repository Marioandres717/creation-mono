import { Transaction, User } from '@creation-mono/shared/types';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../../../common/decorators';
import { JwtAuthGuard } from '../../../common/guards';
import { LoggerService } from '@creation-mono/shared/logger';
import { TransactionService } from '../repository/transaction.service';
import TransactionValidationPipe from '../validators';

@Resolver('Transaction')
@UseGuards(JwtAuthGuard)
export class TransactionMutationsResolver {
  constructor(
    private transactionService: TransactionService,
    private loggerService: LoggerService
  ) {
    this.loggerService.setContext('TransactionMutationsResolver');
  }

  @Mutation('insertTransaction')
  async insertTransaction(
    @Args('transaction') transaction: TransactionValidationPipe,
    @CurrentUser() user: User
  ): Promise<Transaction> {
    const { categoryId, ...trans } = transaction;
    return await this.transactionService.create({
      ...trans,
      user: { connect: { id: user.id } },
      category: { connect: { id: categoryId } },
    });
  }

  @Mutation('updateTransaction')
  async updateTransaction(
    @Args('transaction') transaction: TransactionValidationPipe,
    @Args('where') where: TransactionValidationPipe,
    @CurrentUser() user: User
  ): Promise<Transaction> {
    return await this.transactionService.update(
      {
        ...where,
        id_userId: {
          id: where.id,
          userId: user.id,
        },
      },
      transaction
    );
  }

  @Mutation('deleteTransaction')
  async deleteTransaction(
    @Args('where') where: TransactionValidationPipe,
    @CurrentUser() user: User
  ): Promise<boolean> {
    return (await this.transactionService.delete({
      ...where,
      id_userId: {
        id: where.id,
        userId: user.id,
      },
    }))
      ? true
      : false;
  }
}
