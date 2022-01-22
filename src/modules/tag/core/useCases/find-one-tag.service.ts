import { Injectable, Logger } from '@nestjs/common';
import { TagRepositoryPort } from '@ports/repository';
import { Tag } from '@tag/domain/tag.entity';

@Injectable()
export class FindOneTagService {
  private readonly logger = new Logger(FindOneTagService.name);

  constructor(private readonly tagRepository: TagRepositoryPort) {}

  execute(id: string): Promise<Tag> {
    this.logger.log(`Finding tag: ${id}`);
    return this.tagRepository.findOne(id);
  }
}
