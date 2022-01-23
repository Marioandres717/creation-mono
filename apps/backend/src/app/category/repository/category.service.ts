import { Prisma, PrismaService } from '@creation-mono/shared/models';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  findUnique(categoryWhereUniqueInput: Prisma.CategoryWhereUniqueInput) {
    return this.prisma.category.findFirst({
      where: categoryWhereUniqueInput,
      include: {
        user: true,
      },
    });
  }

  findMany(
    limit: number,
    offset: number,
    order: Prisma.CategoryOrderByWithRelationInput,
    categoryWhereInput: Prisma.CategoryWhereInput
  ) {
    return this.prisma.category.findMany({
      where: categoryWhereInput,
      take: limit,
      skip: offset,
      orderBy: order,
      include: {
        user: true,
      },
    });
  }

  create(category: Prisma.CategoryCreateInput) {
    return this.prisma.category.create({
      data: category,
      include: {
        user: true,
      },
    });
  }

  createMany(categories: Prisma.CategoryCreateManyInput[]) {
    return this.prisma.category.createMany({
      data: categories,
    });
  }

  count(category: Prisma.CategoryWhereInput) {
    return this.prisma.category.count({
      where: category,
    });
  }

  update(
    where: Prisma.CategoryWhereUniqueInput,
    category: Prisma.CategoryUpdateInput
  ) {
    return this.prisma.category.update({
      where,
      data: category,
      include: {
        user: true,
      },
    });
  }

  updateMany(
    where: Prisma.CategoryWhereUniqueInput,
    category: Prisma.CategoryUpdateInput
  ) {
    return this.prisma.category.updateMany({ where, data: category });
  }

  delete(where: Prisma.CategoryWhereUniqueInput) {
    return this.prisma.category.delete({ where });
  }

  deleteMany(where: Prisma.CategoryWhereInput) {
    return this.prisma.category.deleteMany({ where });
  }
}
