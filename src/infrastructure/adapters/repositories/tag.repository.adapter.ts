import {
  Injectable,
  Logger,
  NotFoundException,
  Provider,
} from '@nestjs/common';
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

    const params = { userId: query?.userId };

    const total = await this.prisma.tag.count({ where: params });
    const results = await this.prisma.tag.findMany({
      take: limit,
      skip: (page - 1) * limit,
      where: params,
    });

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

  async update(id: string, data: CreateTagDto): Promise<Tag> {
    this.logger.log(`Updating tag: ${id} with data: ${JSON.stringify(data)}`);

    const updatedNote = await this.prisma.tag.updateMany({
      where: { id, userId: data.userId },
      data,
    });

    if (!updatedNote) throw new NotFoundException(`Tag not found: ${id}`);

    return this.findOne(id);
  }
}

export const TagRepositoryProvider: Provider = {
  provide: TagRepositoryPort,
  useClass: TagRepositoryAdapter,
};
