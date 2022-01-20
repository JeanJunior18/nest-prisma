import { Injectable, Logger } from '@nestjs/common';
import { TagRepositoryPort } from '@ports';
import { Tag } from '@tag/domain/model/tag.entity';

@Injectable()
export class FindTagService {
  private readonly logger = new Logger(FindTagService.name);

  constructor(private readonly tagRepository: TagRepositoryPort) {}

  execute(params = {}): Promise<Tag[]> {
    this.logger.log(`Finding tags with params: ${JSON.stringify(params)}`);
    return this.tagRepository.find(params);
  }
}
