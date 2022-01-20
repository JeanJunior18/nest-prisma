import { Injectable, Logger, Provider } from '@nestjs/common';
import { PrismaService } from '@plugins/prisma';
import { TagRepositoryPort } from '@ports';
import { Tag } from '@tag/domain/model/tag.entity';
import { CreateTagDto } from '@tag/interface/dto';

@Injectable()
export class TagRepositoryAdapter implements TagRepositoryPort {
  private readonly logger = new Logger(TagRepositoryAdapter.name);

  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateTagDto): Promise<Tag> {
    this.logger.log(`Creating tag: ${JSON.stringify(data)}`);
    return this.prisma.tag.create({ data });
  }

  find(params = {}): Promise<Tag[]> {
    this.logger.log(`Finding tags with params: ${JSON.stringify(params)}`);
    return this.prisma.tag.findMany(params);
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
