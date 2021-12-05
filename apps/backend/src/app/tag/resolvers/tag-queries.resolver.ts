import {
  numberfy,
  Tag,
  Tag_OrderByInput,
  Tag_WhereInput,
} from '@creation-mono/shared/types';
import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { TagService } from '../repository/tag.service';

@Resolver('Tag')
export class TagQueriesResolver {
  constructor(private tagService: TagService) {}

  @Query('count_Tag')
  async countCategories(@Args('where') where: Tag_WhereInput): Promise<number> {
    return await this.tagService.countTags(
      numberfy(where, ['id', 'system_defined', 'user_id'])
    );
  }

  @Query('Tag')
  async Tag(
    @Args('limit', { type: () => Int }) limit: number,
    @Args('offset', { type: () => Int }) offset: number,
    @Args('where') where: Tag_WhereInput,
    @Args('orderBy') orderBy: Tag_OrderByInput
  ): Promise<Tag[]> {
    if (where.id) {
      const res = await this.tagService.tag(
        numberfy(where, ['id', 'system_defined', 'user_id'])
      );
      return res ? [res] : [];
    } else {
      return await this.tagService.tags(
        limit,
        offset,
        orderBy,
        numberfy(where, ['id', 'system_defined', 'user_id'])
      );
    }
  }
}
