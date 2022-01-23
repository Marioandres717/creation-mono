import { Category, User } from '@creation-mono/shared/types';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../../../common/decorators';
import { JwtAuthGuard } from '../../../common/guards';
import { LoggerService } from '@creation-mono/shared/logger';
import { CategoryService } from '../repository/category.service';
import CategoryValidationPipe from '../validators';

@Resolver('Category')
@UseGuards(JwtAuthGuard)
export class CategoryMutationsResolver {
  constructor(
    private categoryService: CategoryService,
    private loggerService: LoggerService
  ) {
    this.loggerService.setContext('CategoryMutationsResolver');
  }

  @Mutation('insertCategory')
  async insertCategory(
    @Args('category') category: CategoryValidationPipe,
    @CurrentUser() user: User
  ): Promise<Category> {
    return await this.categoryService.create({
      ...category,
      user: { connect: { id: user.id } },
    });
  }

  @Mutation('updateCategory')
  async updateCategory(
    @Args('category') category: CategoryValidationPipe,
    @Args('where') where: CategoryValidationPipe,
    @CurrentUser() user: User
  ): Promise<Category> {
    return await this.categoryService.update(
      {
        ...where,
        id_userId: {
          id: where.id,
          userId: user.id,
        },
      },
      category
    );
  }

  @Mutation('deleteCategory')
  async deleteCategory(
    @Args('where') where: CategoryValidationPipe,
    @CurrentUser() user: User
  ): Promise<boolean> {
    return (await this.categoryService.delete({
      ...where,
      id_userId: {
        id: where.id,
        userId: user.id,
      },
    }))
      ? true
      : false;
  }
}
