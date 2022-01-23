import { Tag, User } from '@creation-mono/shared/types';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../../../common/decorators';
import { JwtAuthGuard } from '../../../common/guards';
import { LoggerService } from '@creation-mono/shared/logger';
import { TagService } from '../repository/tag.service';
import TagValidationPipe from '../validators';

@Resolver('Tag')
@UseGuards(JwtAuthGuard)
export class TagMutationsResolver {
  constructor(
    private tagService: TagService,
    private loggerService: LoggerService
  ) {
    this.loggerService.setContext('TagMutationsResolver');
  }

  @Mutation('insertTag')
  async insertTag(
    @Args('tag') tag: TagValidationPipe,
    @CurrentUser() user: User
  ): Promise<Tag> {
    return await this.tagService.create({
      ...tag,
      user: { connect: { id: user.id } },
    });
  }

  @Mutation('updateTag')
  async updateTag(
    @Args('tag') tag: TagValidationPipe,
    @Args('where') where: TagValidationPipe,
    @CurrentUser() userCtx: User
  ): Promise<Tag> {
    return await this.tagService.update(
      {
        ...where,
        id_userId: {
          id: where.id,
          userId: userCtx.id,
        },
      },
      tag
    );
  }

  @Mutation('deleteTag')
  async deleteTag(
    @Args('where') where: TagValidationPipe,
    @CurrentUser() userCtx: User
  ): Promise<boolean> {
    return (await this.tagService.delete({
      ...where,
      id_userId: {
        id: where.id,
        userId: userCtx.id,
      },
    }))
      ? true
      : false;
  }
}
