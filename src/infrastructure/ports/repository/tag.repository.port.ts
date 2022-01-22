import { Pagination } from '@ports/utils';
import { Tag } from '@tag/domain/tag.entity';
import { CreateTagDto, UpdateTagDto } from '@tag/interface/dto';

export abstract class TagRepositoryPort {
  create: (note: CreateTagDto) => Promise<Tag>;
  find: (params?: any) => Promise<Pagination<Tag>>;
  findOne: (id: string) => Promise<Tag>;
  update: (id: string, data: UpdateTagDto) => Promise<Tag>;
}
