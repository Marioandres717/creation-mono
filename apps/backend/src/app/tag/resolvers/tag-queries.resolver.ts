import {
  Tag,
  TagOrderByInput,
  TagWhereInput,
} from '@creation-mono/shared/types';
import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { TagService } from '../repository/tag.service';

@Resolver('Tag')
export class TagQueriesResolver {
  constructor(private tagService: TagService) {}

  @Query('countTag')
  async countCategories(@Args('where') where: TagWhereInput): Promise<number> {
    return await this.tagService.countTags(where);
  }

  @Query('tags')
  async Tags(
    @Args('limit', { type: () => Int }) limit: number,
    @Args('offset', { type: () => Int }) offset: number,
    @Args('where') where: TagWhereInput,
    @Args('orderBy') orderBy: TagOrderByInput
  ): Promise<Tag[]> {
    if (where.id) {
      const res = await this.tagService.tag(where);
      return res ? [res] : [];
    } else {
      return await this.tagService.tags(limit, offset, orderBy, where);
    }
  }
}
