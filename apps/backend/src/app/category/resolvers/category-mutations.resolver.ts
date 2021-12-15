import { Category, User } from '@creation-mono/shared/types';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth-guard';
import { CategoryService } from '../repository/category.service';
import CategoryValidationPipe from '../validators';

@Resolver('Category')
@UseGuards(JwtAuthGuard)
export class CategoryMutationsResolver {
  constructor(private categoryService: CategoryService) {}

  @Mutation('insertCategory')
  async insertCategory(
    @Args('category') category: CategoryValidationPipe,
    @CurrentUser() user: User
  ): Promise<Category> {
    return await this.categoryService.createCategory({
      ...category,
      user: { connect: { id: user.id } },
    });
  }

  @Mutation('updateCategory')
  async updateCategory(
    @Args('category') category: CategoryValidationPipe,
    @Args('where') where: CategoryValidationPipe
  ): Promise<Category> {
    return await this.categoryService.updateCategory(where, category);
  }

  @Mutation('deleteCategory')
  async deleteCategory(
    @Args('where') where: CategoryValidationPipe
  ): Promise<boolean> {
    return (await this.categoryService.deleteCategory(where)) ? true : false;
  }
}
