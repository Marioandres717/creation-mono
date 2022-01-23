import { Prisma, PrismaService } from '@creation-mono/shared/models';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TransactionsTagsService {
  constructor(private prisma: PrismaService) {}

  findUnique(uniqueInput: Prisma.TransactionsTagsWhereInput) {
    return this.prisma.transactionsTags.findFirst({
      where: uniqueInput,
      include: {
        tag: true,
        transaction: {
          include: {
            category: true,
            user: true,
          },
        },
      },
    });
  }

  findMany(
    limit: number,
    offset: number,
    order: Prisma.TransactionsTagsOrderByWithRelationInput,
    where: Prisma.TransactionsTagsWhereInput
  ) {
    return this.prisma.transactionsTags.findMany({
      where: where,
      take: limit,
      skip: offset,
      orderBy: order,
      include: {
        tag: true,
        transaction: {
          include: {
            category: true,
            user: true,
          },
        },
      },
    });
  }

  create(item: Prisma.TransactionsTagsCreateInput) {
    return this.prisma.transactionsTags.create({
      data: item,
      include: {
        tag: true,
        transaction: {
          include: {
            category: true,
            user: true,
          },
        },
      },
    });
  }

  count(item: Prisma.TransactionsTagsWhereInput) {
    return this.prisma.transactionsTags.count({
      where: item,
    });
  }

  update(
    where: Prisma.TransactionsTagsWhereUniqueInput,
    item: Prisma.TransactionsTagsUpdateInput
  ) {
    return this.prisma.transactionsTags.update({
      where,
      data: item,
      include: {
        tag: true,
        transaction: {
          include: {
            category: true,
            user: true,
          },
        },
      },
    });
  }

  updateMany(
    where: Prisma.TransactionsTagsWhereInput,
    item: Prisma.TransactionsTagsUpdateInput
  ) {
    return this.prisma.transactionsTags.updateMany({
      where,
      data: item,
    });
  }

  delete(where: Prisma.TransactionsTagsWhereUniqueInput) {
    return this.prisma.transactionsTags.delete({ where });
  }

  deleteMany(where: Prisma.TransactionsTagsWhereInput) {
    return this.prisma.transactionsTags.deleteMany({ where });
  }
}
