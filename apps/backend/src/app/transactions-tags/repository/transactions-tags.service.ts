import { Prisma, PrismaService } from '@creation-mono/shared/models';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TransactionsTagsService {
  constructor(private prisma: PrismaService) {}

  unique(uniqueInput: Prisma.Transactions_TagsWhereUniqueInput) {
    return this.prisma.transactions_Tags.findFirst({
      where: uniqueInput,
    });
  }

  many(
    limit: number,
    offset: number,
    order: Prisma.Transactions_TagsOrderByWithRelationInput,
    where: Prisma.Transactions_TagsWhereInput
  ) {
    return this.prisma.transactions_Tags.findMany({
      where: where,
      take: limit,
      skip: offset,
      orderBy: order,
    });
  }

  add(item: Prisma.Transactions_TagsCreateInput) {
    return this.prisma.transactions_Tags.create({
      data: item,
    });
  }

  count(item: Prisma.Transactions_TagsWhereInput) {
    return this.prisma.transactions_Tags.count({
      where: item,
    });
  }

  update(
    where: Prisma.Transactions_TagsWhereUniqueInput,
    item: Prisma.Transactions_TagsUpdateInput
  ) {
    return this.prisma.transactions_Tags.update({ where, data: item });
  }

  updateUsers(
    where: Prisma.Transactions_TagsWhereUniqueInput,
    item: Prisma.Transactions_TagsUpdateInput
  ) {
    return this.prisma.transactions_Tags.updateMany({
      where,
      data: item,
    });
  }

  delete(where: Prisma.Transactions_TagsWhereUniqueInput) {
    return this.prisma.transactions_Tags.delete({ where });
  }

  deleteMany(where: Prisma.Transactions_TagsWhereInput) {
    return this.prisma.transactions_Tags.deleteMany({ where });
  }
}
