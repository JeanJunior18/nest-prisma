import { Injectable, Logger, Provider } from '@nestjs/common';
import { PrismaService } from '@plugins/prisma';
import { TagRepositoryPort } from '@ports/repository';
import { Pagination } from '@ports/utils';
import { Tag } from '@tag/domain/tag.entity';
import { CreateTagDto, QueryParamsTagDto } from '@tag/interface/dto';

@Injectable()
export class TagRepositoryAdapter implements TagRepositoryPort {
  private readonly logger = new Logger(TagRepositoryAdapter.name);

  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateTagDto): Promise<Tag> {
    this.logger.log(`Creating tag: ${JSON.stringify(data)}`);
    return this.prisma.tag.create({ data });
  }

  async find(query?: QueryParamsTagDto): Promise<Pagination<Tag>> {
    this.logger.log(`Finding tags with params: ${JSON.stringify(query)}`);
    const limit = +query?.limit || 10;
    const page = +query?.page || 1;
    const results = await this.prisma.tag.findMany({
      take: limit,
      skip: (page - 1) * limit,
    });
    const total = await this.prisma.tag.count();

    return new Pagination<Tag>(
      total,
      page,
      limit,
      Math.ceil(total / limit),
      results,
    );
  }

  findOne(id: string): Promise<Tag> {
    this.logger.log(`Finding tag: ${id}`);
    return this.prisma.tag.findUnique({ where: { id } });
  }

  update(id: string, data: CreateTagDto): Promise<Tag> {
    this.logger.log(`Updating tag: ${id} with data: ${JSON.stringify(data)}`);
    return this.prisma.tag.update({
      where: { id },
      data,
    });
  }
}

export const TagRepositoryProvider: Provider = {
  provide: TagRepositoryPort,
  useClass: TagRepositoryAdapter,
};
