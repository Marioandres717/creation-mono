import { Prisma, PrismaService } from '@creation-mono/shared/models';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TagService {
  constructor(private prisma: PrismaService) {}

  findUnique(tagWhereUniqueInput: Prisma.TagWhereUniqueInput) {
    return this.prisma.tag.findFirst({
      where: tagWhereUniqueInput,
      include: {
        user: true,
      },
    });
  }

  findMany(
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

  create(tag: Prisma.TagCreateInput) {
    return this.prisma.tag.create({
      data: tag,
      include: {
        user: true,
      },
    });
  }

  createMany(tags: Prisma.TagCreateManyInput[]) {
    return this.prisma.tag.createMany({ data: tags });
  }

  count(tag: Prisma.TagWhereInput) {
    return this.prisma.tag.count({
      where: tag,
    });
  }

  update(where: Prisma.TagWhereUniqueInput, tag: Prisma.TagUpdateInput) {
    return this.prisma.tag.update({
      where,
      data: tag,
      include: {
        user: true,
      },
    });
  }

  updateMany(where: Prisma.TagWhereUniqueInput, tag: Prisma.TagUpdateInput) {
    return this.prisma.tag.updateMany({ where, data: tag });
  }

  delete(where: Prisma.TagWhereUniqueInput) {
    return this.prisma.tag.delete({ where });
  }

  deleteMany(where: Prisma.TagWhereInput) {
    return this.prisma.tag.deleteMany({ where });
  }
}
