import {
  Tag,
  TagInsertInput,
  TagUpdateInput,
  TagWhereInput,
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
    const newTag = await this.tagService.createTag({
      ...tag,
      isSystemDefined: Number(tag.isSystemDefined),
      User: { connect: { id: user.id } },
    });
    return { ...newTag, isSystemDefined: Boolean(newTag.isSystemDefined) };
  }

  @Mutation('updateTag')
  async updateTag(
    @Args('tag') tag: TagUpdateInput,
    @Args('where') where: TagWhereInput
  ): Promise<Tag> {
    const updatedTag = await this.tagService.updateTag(where, {
      ...tag,
      isSystemDefined: Number(tag.isSystemDefined),
    });

    return {
      ...updatedTag,
      isSystemDefined: Boolean(updatedTag.isSystemDefined),
    };
  }

  @Mutation('deleteTag')
  async deleteTag(@Args('where') where: TagWhereInput): Promise<boolean> {
    let res;
    if (where.id) {
      res = await this.tagService.deleteTag(where);
    } else {
      res = await this.tagService.deleteTags({
        ...where,
        isSystemDefined: Number(where.isSystemDefined),
      });
    }
    return res ? true : false;
  }
}
