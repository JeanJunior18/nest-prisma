import { Injectable, Logger } from '@nestjs/common';
import { TagRepositoryPort } from '@ports/repository';
import { Tag } from '@tag/domain/model/tag.entity';
import { UpdateTagDto } from '@tag/interface/dto';

@Injectable()
export class UpdateTagService {
  private readonly logger = new Logger(UpdateTagService.name);

  constructor(private readonly tagRepository: TagRepositoryPort) {}

  execute(id: string, data: UpdateTagDto): Promise<Tag> {
    this.logger.log(`Updating tag: ${id} with data: ${JSON.stringify(data)}`);
    return this.tagRepository.update(id, data);
  }
}
