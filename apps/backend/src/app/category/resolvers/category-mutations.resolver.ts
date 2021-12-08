import {
  Category,
  CategoryInsertInput,
  CategoryUpdateInput,
  CategoryWhereInput,
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
    const newCategory = await this.categoryService.createCategory({
      ...category,
      isSystemDefined: Number(category.isSystemDefined),
      User: { connect: { id: user.id } },
    });

    return {
      ...newCategory,
      isSystemDefined: Boolean(newCategory.isSystemDefined),
    };
  }

  @Mutation('updateCategory')
  async updateCategory(
    @Args('category') category: CategoryUpdateInput,
    @Args('where') where: CategoryWhereInput
  ): Promise<Category> {
    const updatedCategory = await this.categoryService.updateCategory(where, {
      ...category,
      isSystemDefined: Number(category.isSystemDefined),
    });

    return {
      ...updatedCategory,
      isSystemDefined: Boolean(updatedCategory.isSystemDefined),
    };
  }

  @Mutation('deleteCategory')
  async deleteCategory(
    @Args('where') where: CategoryWhereInput
  ): Promise<boolean> {
    let res;
    if (where.id) {
      res = await this.categoryService.deleteCategory(where);
    } else {
      res = await this.categoryService.deleteCategories({
        ...where,
        isSystemDefined: Number(where.isSystemDefined),
      });
    }
    return res ? true : false;
  }
}
