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
    return await this.categoryService.countCategories({
      ...where,
      isSystemDefined: Number(where.isSystemDefined),
    });
  }

  @Query('categories')
  async categories(
    @Args('limit', { type: () => Int }) limit: number,
    @Args('offset', { type: () => Int }) offset: number,
    @Args('where') where: CategoryWhereInput,
    @Args('orderBy') orderBy: CategoryOrderByInput
  ): Promise<Category[]> {
    const categories = (
      await this.categoryService.categories(limit, offset, orderBy, {
        ...where,
        isSystemDefined: Number(where.isSystemDefined),
      })
    ).map((category) => ({
      ...category,
      isSystemDefined: Boolean(category.isSystemDefined),
    }));

    return categories;
  }

  @Query('category')
  async category(@Args('where') where: CategoryWhereInput) {
    return await this.categoryService.category(where);
  }
}
