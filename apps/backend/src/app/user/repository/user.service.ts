import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { PrismaService, Prisma } from '@creation-mono/shared/models';
import { CreateInitialCategoriesCommand } from '../../category/commands/impl/create-initial-categories.command';
import { CreateInitialTagsCommand } from '../../tag/commands/impl/create-initial-tags.command';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService, private commandBus: CommandBus) {}

  simpleUser(userWhereUniqueInput: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.findFirst({
      where: userWhereUniqueInput,
    });
  }

  findUnique(userWhereUniqueInput: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.findFirst({
      where: userWhereUniqueInput,
      include: {
        categories: {
          include: {
            user: true,
            transactions: true,
          },
        },
        tags: {
          include: {
            user: true,
          },
        },
        transactions: {
          include: {
            user: true,
            category: true,
          },
        },
      },
    });
  }

  findMany(
    limit: number,
    offset: number,
    order: Prisma.UserOrderByWithRelationInput,
    userWhereInput: Prisma.UserWhereInput
  ) {
    return this.prisma.user.findMany({
      where: userWhereInput,
      take: limit,
      skip: offset,
      orderBy: order,
      include: {
        categories: true,
        tags: true,
        transactions: true,
      },
    });
  }

  async create(user: Prisma.UserCreateInput) {
    const newUser = await this.prisma.user.create({
      data: user,
      include: {
        categories: true,
        tags: true,
        transactions: true,
      },
    });

    await Promise.all([
      this.commandBus.execute(new CreateInitialCategoriesCommand(newUser.id)),
      this.commandBus.execute(new CreateInitialTagsCommand(newUser.id)),
    ]);

    return newUser;
  }

  count(user: Prisma.UserWhereInput) {
    return this.prisma.user.count({
      where: user,
    });
  }

  update(where: Prisma.UserWhereUniqueInput, user: Prisma.UserUpdateInput) {
    return this.prisma.user.update({
      where,
      data: user,
      include: {
        categories: true,
        tags: true,
        transactions: true,
      },
    });
  }

  updateMany(where: Prisma.UserWhereUniqueInput, user: Prisma.UserUpdateInput) {
    return this.prisma.user.updateMany({
      where,
      data: user,
    });
  }

  delete(where: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.delete({ where });
  }

  deleteMany(where: Prisma.UserWhereInput) {
    return this.prisma.user.deleteMany({ where });
  }
}
