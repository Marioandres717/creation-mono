import { Prisma, PrismaService } from '@creation-mono/shared/models';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {}

  transaction(transactionWhereUniqueInput: Prisma.TransactionWhereUniqueInput) {
    return this.prisma.transaction.findFirst({
      where: transactionWhereUniqueInput,
    });
  }

  transactions(
    limit: number,
    offset: number,
    order: Prisma.TransactionOrderByWithRelationInput,
    transactionWhereInput: Prisma.TransactionWhereInput
  ) {
    return this.prisma.transaction.findMany({
      where: transactionWhereInput,
      take: limit,
      skip: offset,
      orderBy: order,
    });
  }

  createTransaction(transaction: Prisma.TransactionCreateInput) {
    return this.prisma.transaction.create({
      data: transaction,
    });
  }

  countTransactions(transaction: Prisma.TransactionWhereInput) {
    return this.prisma.transaction.count({
      where: transaction,
    });
  }

  updateTransaction(
    where: Prisma.TransactionWhereUniqueInput,
    transaction: Prisma.TransactionUpdateInput
  ) {
    return this.prisma.transaction.update({ where, data: transaction });
  }

  updateTransactions(
    where: Prisma.TransactionWhereUniqueInput,
    transaction: Prisma.TransactionUpdateInput
  ) {
    return this.prisma.transaction.updateMany({ where, data: transaction });
  }

  deleteTransaction(where: Prisma.TransactionWhereUniqueInput) {
    return this.prisma.transaction.delete({ where });
  }

  deleteTransactions(where: Prisma.TransactionWhereInput) {
    return this.prisma.transaction.deleteMany({ where });
  }
}
