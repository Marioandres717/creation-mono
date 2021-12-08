import {
  Tag,
  TagOrderByInput,
  TagWhereInput,
} from '@creation-mono/shared/types';
import { UseGuards } from '@nestjs/common';
import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth-guard';
import { TagService } from '../repository/tag.service';

UseGuards(JwtAuthGuard);
@Resolver('Tag')
export class TagQueriesResolver {
  constructor(private tagService: TagService) {}

  @Query('countTag')
  async countCategories(@Args('where') where: TagWhereInput): Promise<number> {
    return await this.tagService.countTags({
      ...where,
      isSystemDefined: Number(where.isSystemDefined),
    });
  }

  @Query('tags')
  async tags(
    @Args('limit', { type: () => Int }) limit: number,
    @Args('offset', { type: () => Int }) offset: number,
    @Args('where') where: TagWhereInput,
    @Args('orderBy') orderBy: TagOrderByInput
  ): Promise<Tag[]> {
    const tags = (
      await this.tagService.tags(limit, offset, orderBy, {
        ...where,
        isSystemDefined: Number(where.isSystemDefined),
      })
    ).map((tag) => ({
      ...tag,
      isSystemDefined: Boolean(tag.isSystemDefined),
    }));

    return tags;
  }

  @Query('tag')
  async tag(@Args('where') where: TagWhereInput): Promise<Tag> {
    const tag = await this.tagService.tag(where);
    return { ...tag, isSystemDefined: Boolean(tag.isSystemDefined) };
  }
}
