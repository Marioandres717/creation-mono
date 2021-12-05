import { Module } from '@nestjs/common';
import { SharedModelsModule } from '@creation-mono/shared/models';
import { CategoryQueriesResolver } from './resolvers/category-queries.resolver';
import { CategoryMutationsResolver } from './resolvers/category-mutations.resolver';
import { CategoryService } from './repository/category.service';

@Module({
  imports: [SharedModelsModule],
  providers: [
    CategoryQueriesResolver,
    CategoryMutationsResolver,
    CategoryService,
  ],
})
export class CategoryModule {}
