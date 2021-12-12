import {
  Category,
  CategoryInsertInput,
  CategoryUpdateInput,
  CategoryWhereUniqueInput,
  User,
} from '@creation-mono/shared/types';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth-guard';
import { CategoryService } from '../repository/category.service';

@Resolver('Category')
@UseGuards(JwtAuthGuard)
export class CategoryMutationsResolver {
  constructor(private categoryService: CategoryService) {}

  @Mutation('insertCategory')
  async insertCategory(
    @Args('category') category: CategoryInsertInput,
    @CurrentUser() user: User
  ): Promise<Category> {
    return await this.categoryService.createCategory({
      ...category,
      User: { connect: { id: user.id } },
    });
  }

  @Mutation('updateCategory')
  async updateCategory(
    @Args('category') category: CategoryUpdateInput,
    @Args('where') where: CategoryWhereUniqueInput
  ): Promise<Category> {
    return await this.categoryService.updateCategory(where, category);
  }

  @Mutation('deleteCategory')
  async deleteCategory(
    @Args('where') where: CategoryWhereUniqueInput
  ): Promise<boolean> {
    return (await this.categoryService.deleteCategory(where)) ? true : false;
  }
}
