import { Injectable, Logger } from '@nestjs/common';
import { TagRepositoryPort } from '@ports/repository';
import { Tag } from '@tag/domain/tag.entity';
import { CreateTagDto } from '@tag/interface/dto';

@Injectable()
export class CreateTagService {
  private readonly logger = new Logger(CreateTagService.name);

  constructor(private readonly tagRepository: TagRepositoryPort) {}

  execute(data: CreateTagDto): Promise<Tag> {
    this.logger.log(`Creating tag: ${JSON.stringify(data)}`);
    return this.tagRepository.create(data);
  }
}
