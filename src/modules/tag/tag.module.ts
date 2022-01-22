import { TagRepositoryProvider } from '@adapters/repositories';
import { Module } from '@nestjs/common';
import { TagRestController } from '@tag/interface/rest.controller';
import {
  CreateTagService,
  FindOneTagService,
  FindTagService,
  UpdateTagService,
} from '@tag/useCases';

@Module({
  controllers: [TagRestController],
  providers: [
    TagRepositoryProvider,
    CreateTagService,
    FindTagService,
    FindOneTagService,
    UpdateTagService,
  ],
})
export class TagModule {}
