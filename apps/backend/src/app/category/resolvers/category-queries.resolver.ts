import {
  Category,
  Category_OrderByInput,
  Category_WhereInput,
  numberfy,
} from '@creation-mono/shared/types';
import { UseGuards } from '@nestjs/common';
import { Query, Args, Int, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth-guard';
import { CategoryService } from '../repository/category.service';

@Resolver('Category')
@UseGuards(JwtAuthGuard)
export class CategoryQueriesResolver {
  constructor(private categoryService: CategoryService) {}

  @Query('count_Category')
  async countCategories(
    @Args('where') where: Category_WhereInput
  ): Promise<number> {
    return await this.categoryService.countCategories(
      numberfy(where, ['id', 'system_defined', 'user_id'])
    );
  }

  @Query('Category')
  async category(
    @Args('limit', { type: () => Int }) limit: number,
    @Args('offset', { type: () => Int }) offset: number,
    @Args('where') where: Category_WhereInput,
    @Args('orderBy') orderBy: Category_OrderByInput
  ): Promise<Category[]> {
    if (where.id) {
      const res = await this.categoryService.category(
        numberfy(where, ['id', 'system_defined', 'user_id'])
      );
      return res ? [res] : [];
    } else {
      return await this.categoryService.categories(
        limit,
        offset,
        orderBy,
        numberfy(where, ['id', 'system_defined', 'user_id'])
      );
    }
  }
}
