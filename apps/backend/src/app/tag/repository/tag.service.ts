import { Prisma, PrismaService } from '@creation-mono/shared/models';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TagService {
  constructor(private prisma: PrismaService) {}

  tag(tagWhereUniqueInput: Prisma.TagWhereUniqueInput) {
    return this.prisma.tag.findFirst({
      where: tagWhereUniqueInput,
      include: {
        user: true,
      },
    });
  }

  tags(
    limit: number,
    offset: number,
    order: Prisma.TagOrderByWithRelationInput,
    tagWhereInput: Prisma.TagWhereInput
  ) {
    return this.prisma.tag.findMany({
      where: tagWhereInput,
      take: limit,
      skip: offset,
      orderBy: order,
      include: {
        user: true,
      },
    });
  }

  createTag(tag: Prisma.TagCreateInput) {
    const { name, user } = tag;
    return this.prisma.tag.create({
      data: {
        name,
        user,
      },
      include: {
        user: true,
      },
    });
  }

  countTags(tag: Prisma.TagWhereInput) {
    return this.prisma.tag.count({
      where: tag,
    });
  }

  updateTag(where: Prisma.TagWhereUniqueInput, tag: Prisma.TagUpdateInput) {
    return this.prisma.tag.update({
      where,
      data: tag,
      include: {
        user: true,
      },
    });
  }

  updateTags(where: Prisma.TagWhereUniqueInput, tag: Prisma.TagUpdateInput) {
    return this.prisma.tag.updateMany({ where, data: tag });
  }

  deleteTag(where: Prisma.TagWhereUniqueInput) {
    return this.prisma.tag.delete({ where });
  }

  deleteTags(where: Prisma.TagWhereInput) {
    return this.prisma.tag.deleteMany({ where });
  }
}
