import { Module } from '@nestjs/common';
import { TagQueriesResolver } from './resolvers/tag-queries.resolver';
import { TagMutationsResolver } from './resolvers/tag-mutations.resolver';
import { TagService } from './repository/tag.service';
import { PrismaService } from '@creation-mono/shared/models';
import { LoggerService } from '@creation-mono/shared/logger';

@Module({
  providers: [
    TagQueriesResolver,
    TagMutationsResolver,
    TagService,
    PrismaService,
    LoggerService,
  ],
})
export class TagModule {}
