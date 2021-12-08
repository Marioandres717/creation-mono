import { Injectable } from '@nestjs/common';
import { PrismaService, Prisma } from '@creation-mono/shared/models';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  user(userWhereUniqueInput: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.findFirst({
      where: userWhereUniqueInput,
    });
  }

  users(
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
    });
  }

  createUser(user: Prisma.UserCreateInput) {
    return this.prisma.user.create({
      data: user,
    });
  }

  countUsers(user: Prisma.UserWhereInput) {
    return this.prisma.user.count({
      where: user,
    });
  }

  updateUser(where: Prisma.UserWhereUniqueInput, user: Prisma.UserUpdateInput) {
    return this.prisma.user.update({ where, data: user });
  }

  updateUsers(
    where: Prisma.UserWhereUniqueInput,
    user: Prisma.UserUpdateInput
  ) {
    return this.prisma.user.updateMany({
      where,
      data: user,
    });
  }

  deleteUser(where: Prisma.UserWhereUniqueInput) {
    return this.prisma.user.delete({ where });
  }

  deleteUsers(where: Prisma.UserWhereInput) {
    return this.prisma.user.deleteMany({ where });
  }
}
