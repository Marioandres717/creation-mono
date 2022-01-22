import {
  Category,
  CategoryOrderByInput,
  User,
} from '@creation-mono/shared/types';
import { UseGuards } from '@nestjs/common';
import { Query, Args, Int, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { LoggerService } from '@creation-mono/shared/logger';
import { CategoryService } from '../repository/category.service';
import CategoryValidationPipe from '../validators';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';

@Resolver('Category')
@UseGuards(JwtAuthGuard)
export class CategoryQueriesResolver {
  constructor(
    private categoryService: CategoryService,
    private loggerService: LoggerService
  ) {
    this.loggerService.setContext('CategoryQueriesResolver');
  }

  @Query('countCategory')
  async countCategories(
    @Args('where') where: CategoryValidationPipe,
    @CurrentUser() user: User
  ): Promise<number> {
    return await this.categoryService.countCategories({
      ...where,
      userId: user.id,
    });
  }

  @Query('categories')
  async categories(
    @Args('limit', { type: () => Int }) limit: number,
    @Args('offset', { type: () => Int }) offset: number,
    @Args('where') where: CategoryValidationPipe,
    @Args('orderBy') orderBy: CategoryOrderByInput,
    @CurrentUser() user: User
  ): Promise<Category[]> {
    return <Category[]>await this.categoryService.categories(
      limit,
      offset,
      orderBy,
      {
        ...where,
        userId: user.id,
      }
    );
  }

  @Query('category')
  async category(
    @Args('where') where: CategoryValidationPipe,
    @CurrentUser() user: User
  ): Promise<Category> {
    return <Category>(
      await this.categoryService.category({ ...where, userId: user.id })
    );
  }
}
