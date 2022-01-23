import { Prisma, PrismaService } from '@creation-mono/shared/models';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TransactionService {
  constructor(private prisma: PrismaService) {}

  findUnique(transactionWhereInput: Prisma.TransactionWhereUniqueInput) {
    return this.prisma.transaction.findFirst({
      where: transactionWhereInput,
      include: {
        category: true,
        user: true,
      },
    });
  }

  findMany(
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
      include: {
        category: true,
        user: true,
      },
    });
  }

  create(transaction: Prisma.TransactionCreateInput) {
    return this.prisma.transaction.create({
      data: transaction,
      include: {
        category: true,
        user: true,
      },
    });
  }

  count(transaction: Prisma.TransactionWhereInput) {
    return this.prisma.transaction.count({
      where: transaction,
    });
  }

  update(
    where: Prisma.TransactionWhereUniqueInput,
    transaction: Prisma.TransactionUpdateInput
  ) {
    return this.prisma.transaction.update({
      where,
      data: transaction,
      include: {
        category: true,
        user: true,
      },
    });
  }

  updateMany(
    where: Prisma.TransactionWhereUniqueInput,
    transaction: Prisma.TransactionUpdateInput
  ) {
    return this.prisma.transaction.updateMany({ where, data: transaction });
  }

  delete(where: Prisma.TransactionWhereUniqueInput) {
    return this.prisma.transaction.delete({ where });
  }

  deleteMany(where: Prisma.TransactionWhereInput) {
    return this.prisma.transaction.deleteMany({ where });
  }
}
