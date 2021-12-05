import { Module } from '@nestjs/common';
import { TagQueriesResolver } from './resolvers/tag-queries.resolver';
import { TagMutationsResolver } from './resolvers/tag-mutations.resolver';
import { TagService } from './repository/tag.service';
import { SharedModelsModule } from '@creation-mono/shared/models';

@Module({
  imports: [SharedModelsModule],
  providers: [TagQueriesResolver, TagMutationsResolver, TagService],
})
export class TagModule {}
