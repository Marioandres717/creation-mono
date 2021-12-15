import { Tag, TagOrderByInput } from '@creation-mono/shared/types';
import { UseGuards } from '@nestjs/common';
import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth-guard';
import { TagService } from '../repository/tag.service';
import TagValidationPipe from '../validators';

@Resolver('Tag')
@UseGuards(JwtAuthGuard)
export class TagQueriesResolver {
  constructor(private tagService: TagService) {}

  @Query('countTag')
  async countCategories(
    @Args('where') where: TagValidationPipe
  ): Promise<number> {
    return await this.tagService.countTags(where);
  }

  @Query('tags')
  async tags(
    @Args('limit', { type: () => Int }) limit: number,
    @Args('offset', { type: () => Int }) offset: number,
    @Args('where') where: TagValidationPipe,
    @Args('orderBy') orderBy: TagOrderByInput
  ): Promise<Tag[]> {
    return await this.tagService.tags(limit, offset, orderBy, where);
  }

  @Query('tag')
  async tag(@Args('where') where: TagValidationPipe): Promise<Tag> {
    return await this.tagService.tag(where);
  }
}
