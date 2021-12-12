import {
  Tag,
  TagInsertInput,
  TagUpdateInput,
  TagWhereUniqueInput,
  User,
} from '@creation-mono/shared/types';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth-guard';
import { TagService } from '../repository/tag.service';

@Resolver('Tag')
@UseGuards(JwtAuthGuard)
export class TagMutationsResolver {
  constructor(private tagService: TagService) {}

  @Mutation('insertTag')
  async insertTag(
    @Args('tag') tag: TagInsertInput,
    @CurrentUser() user: User
  ): Promise<Tag> {
    return await this.tagService.createTag({
      ...tag,
      User: { connect: { id: user.id } },
    });
  }

  @Mutation('updateTag')
  async updateTag(
    @Args('tag') tag: TagUpdateInput,
    @Args('where') where: TagWhereUniqueInput
  ): Promise<Tag> {
    return await this.tagService.updateTag(where, tag);
  }

  @Mutation('deleteTag')
  async deleteTag(@Args('where') where: TagWhereUniqueInput): Promise<boolean> {
    return (await this.tagService.deleteTags(where)) ? true : false;
  }
}
