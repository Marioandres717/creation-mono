import {
  Category,
  Category_InsertInput,
  Category_UpdateInput,
  Category_WhereInput,
  numberfy,
  User,
} from '@creation-mono/shared/types';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth-guard';
import { CategoryService } from '../repository/category.service';

@Resolver()
@UseGuards(JwtAuthGuard)
export class CategoryMutationsResolver {
  constructor(private categoryService: CategoryService) {}

  @Mutation('insert_Category')
  async createCategory(
    @Args('Category') category: Category_InsertInput,
    @CurrentUser() user: User
  ): Promise<Category> {
    return await this.categoryService.createCategory({
      ...category,
      User: { connect: user },
    });
  }

  @Mutation('update_Category')
  async updateCategory(
    @Args('Category') category: Category_UpdateInput,
    @Args('where') where: Category_WhereInput
  ): Promise<Category> {
    return await this.categoryService.updateCategory(
      numberfy(where, ['id', 'system_defined', 'user_id']),
      category
    );
  }

  @Mutation('delete_Category')
  async deleteCategory(
    @Args('where') where: Category_WhereInput
  ): Promise<boolean> {
    let res;
    if (where.id) {
      res = await this.categoryService.deleteCategory(numberfy(where, ['id']));
    } else {
      res = await this.categoryService.deleteCategories(
        numberfy(where, ['system_defined', 'user_id'])
      );
    }
    return res ? true : false;
  }
}
