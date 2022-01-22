import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { TagQueriesResolver } from './resolvers/tag-queries.resolver';
import { TagMutationsResolver } from './resolvers/tag-mutations.resolver';
import { TagService } from './repository/tag.service';
import { PrismaService } from '@creation-mono/shared/models';
import { LoggerService } from '@creation-mono/shared/logger';
import { CommandHandlers } from './commands/handlers';

@Module({
  imports: [CqrsModule],
  providers: [
    TagQueriesResolver,
    TagMutationsResolver,
    TagService,
    PrismaService,
    LoggerService,
    ...CommandHandlers,
  ],
})
export class TagModule {}
