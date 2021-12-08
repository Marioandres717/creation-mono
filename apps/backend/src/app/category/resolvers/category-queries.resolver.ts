import {
  Category,
  CategoryOrderByInput,
  CategoryWhereInput,
} from '@creation-mono/shared/types';
import { UseGuards } from '@nestjs/common';
import { Query, Args, Int, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth-guard';
import { CategoryService } from '../repository/category.service';

@Resolver('Category')
@UseGuards(JwtAuthGuard)
export class CategoryQueriesResolver {
  constructor(private categoryService: CategoryService) {}

  @Query('countCategory')
  async countCategories(
    @Args('where') where: CategoryWhereInput
  ): Promise<number> {
    return await this.categoryService.countCategories(where);
  }

  @Query('categories')
  async categories(
    @Args('limit', { type: () => Int }) limit: number,
    @Args('offset', { type: () => Int }) offset: number,
    @Args('where') where: CategoryWhereInput,
    @Args('orderBy') orderBy: CategoryOrderByInput
  ): Promise<Category[]> {
    if (where.id) {
      const res = await this.categoryService.category(where);
      return res ? [res] : [];
    } else {
      return await this.categoryService.categories(
        limit,
        offset,
        orderBy,
        where
      );
    }
  }
}
