import { Tag, TagOrderByInput, User } from '@creation-mono/shared/types';
import { UseGuards } from '@nestjs/common';
import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { LoggerService } from '@creation-mono/shared/logger';
import { TagService } from '../repository/tag.service';
import TagValidationPipe from '../validators';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';

@Resolver('Tag')
@UseGuards(JwtAuthGuard)
export class TagQueriesResolver {
  constructor(
    private tagService: TagService,
    private loggerService: LoggerService
  ) {
    this.loggerService.setContext('TagQueriesResolver');
  }

  @Query('countTag')
  async countCategories(
    @Args('where') where: TagValidationPipe,
    @CurrentUser() user: User
  ): Promise<number> {
    return await this.tagService.count({ ...where, userId: user.id });
  }

  @Query('tags')
  async tags(
    @Args('limit', { type: () => Int }) limit: number,
    @Args('offset', { type: () => Int }) offset: number,
    @Args('where') where: TagValidationPipe,
    @Args('orderBy') orderBy: TagOrderByInput,
    @CurrentUser() user: User
  ): Promise<Tag[]> {
    return await this.tagService.findMany(limit, offset, orderBy, {
      ...where,
      userId: user.id,
    });
  }

  @Query('tag')
  async tag(
    @Args('where') where: TagValidationPipe,
    @CurrentUser() user: User
  ): Promise<Tag> {
    return await this.tagService.findUnique({
      id_userId: {
        id: where.id,
        userId: user.id,
      },
    });
  }
}
