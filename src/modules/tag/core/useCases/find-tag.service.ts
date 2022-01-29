import { Injectable, Logger } from '@nestjs/common';
import { TagRepositoryPort } from '@ports/repository';
import { Pagination } from '@ports/utils';
import { Tag } from '@tag/domain/tag.entity';
import { QueryParamsTagDto } from '@tag/interface/dto';

@Injectable()
export class FindTagService {
  private readonly logger = new Logger(FindTagService.name);

  constructor(private readonly tagRepository: TagRepositoryPort) {}

  execute(query?: QueryParamsTagDto): Promise<Pagination<Tag>> {
    this.logger.log(
      `Finding tags with params: ${JSON.stringify(query)} for user: ${
        query.userId
      }`,
    );
    return this.tagRepository.find(query);
  }
}
