import { Prisma, PrismaService } from '@creation-mono/shared/models';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  category(categoryWhereUniqueInput: Prisma.CategoryWhereUniqueInput) {
    return this.prisma.category.findFirst({
      where: categoryWhereUniqueInput,
    });
  }

  categories(
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
    });
  }

  createCategory(category: Prisma.CategoryCreateInput) {
    const { name, User } = category;
    return this.prisma.category.create({
      data: {
        name,
        User,
      },
    });
  }

  countCategories(category: Prisma.CategoryWhereInput) {
    return this.prisma.category.count({
      where: category,
    });
  }

  updateCategory(
    where: Prisma.CategoryWhereUniqueInput,
    category: Prisma.CategoryUpdateInput
  ) {
    return this.prisma.category.update({ where, data: category });
  }

  updateCategories(
    where: Prisma.CategoryWhereUniqueInput,
    category: Prisma.CategoryUpdateInput
  ) {
    return this.prisma.category.updateMany({ where, data: category });
  }

  deleteCategory(where: Prisma.CategoryWhereUniqueInput) {
    return this.prisma.category.delete({ where });
  }

  deleteCategories(where: Prisma.CategoryWhereInput) {
    return this.prisma.category.deleteMany({ where });
  }
}
