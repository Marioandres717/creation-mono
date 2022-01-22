import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PrismaService } from '@creation-mono/shared/models';
import { CategoryQueriesResolver } from './resolvers/category-queries.resolver';
import { CategoryMutationsResolver } from './resolvers/category-mutations.resolver';
import { CategoryService } from './repository/category.service';
import { LoggerService } from '@creation-mono/shared/logger';
import { CommandHandlers } from './commands/handlers';

@Module({
  imports: [CqrsModule],
  providers: [
    CategoryQueriesResolver,
    CategoryMutationsResolver,
    CategoryService,
    PrismaService,
    LoggerService,
    ...CommandHandlers,
  ],
})
export class CategoryModule {}
