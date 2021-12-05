import {
  numberfy,
  Tag,
  Tag_InsertInput,
  Tag_UpdateInput,
  Tag_WhereInput,
  User,
} from '@creation-mono/shared/types';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth-guard';
import { TagService } from '../repository/tag.service';

@Resolver()
@UseGuards(JwtAuthGuard)
export class TagMutationsResolver {
  constructor(private tagService: TagService) {}

  @Mutation('insert_Tag')
  async createTag(
    @Args('Tag') tag: Tag_InsertInput,
    @CurrentUser() user: User
  ): Promise<Tag> {
    return await this.tagService.createTag({
      ...tag,
      User: { connect: { id: user.id } },
    });
  }

  @Mutation('update_Tag')
  async updateTag(
    @Args('Tag') tag: Tag_UpdateInput,
    @Args('where') where: Tag_WhereInput
  ): Promise<Tag> {
    return await this.tagService.updateTag(
      numberfy(where, ['id', 'system_defined', 'user_id']),
      tag
    );
  }

  @Mutation('delete_Tag')
  async deleteTag(@Args('where') where: Tag_WhereInput): Promise<boolean> {
    let res;
    if (where.id) {
      res = await this.tagService.deleteTag(numberfy(where, ['id']));
    } else {
      res = await this.tagService.deleteTags(
        numberfy(where, ['system_defined', 'user_id'])
      );
    }
    return res ? true : false;
  }
}
