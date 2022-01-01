import { Category, CategoryOrderByInput } from '@creation-mono/shared/types';
import { UseGuards } from '@nestjs/common';
import { Query, Args, Int, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { LoggerService } from '../../logger';
import { CategoryService } from '../repository/category.service';
import CategoryValidationPipe from '../validators';

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
    @Args('where') where: CategoryValidationPipe
  ): Promise<number> {
    return await this.categoryService.countCategories(where);
  }

  @Query('categories')
  async categories(
    @Args('limit', { type: () => Int }) limit: number,
    @Args('offset', { type: () => Int }) offset: number,
    @Args('where') where: CategoryValidationPipe,
    @Args('orderBy') orderBy: CategoryOrderByInput
  ): Promise<Category[]> {
    return <Category[]>(
      await this.categoryService.categories(limit, offset, orderBy, where)
    );
  }

  @Query('category')
  async category(
    @Args('where') where: CategoryValidationPipe
  ): Promise<Category> {
    return <Category>await this.categoryService.category(where);
  }
}
