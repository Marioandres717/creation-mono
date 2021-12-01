import { Prisma } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@creation-mono/shared/models';
import { User } from '@creation-mono/shared/types';

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

  createUser(user: Partial<User>) {
    const { email, username, password } = user;
    return this.prisma.user.create({
      data: {
        email,
        username,
        password,
      },
    });
  }
}
