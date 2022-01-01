import { Module } from '@nestjs/common';
import { PrismaService } from '@creation-mono/shared/models';
import { CategoryQueriesResolver } from './resolvers/category-queries.resolver';
import { CategoryMutationsResolver } from './resolvers/category-mutations.resolver';
import { CategoryService } from './repository/category.service';

@Module({
  providers: [
    CategoryQueriesResolver,
    CategoryMutationsResolver,
    CategoryService,
    PrismaService,
  ],
})
export class CategoryModule {}
