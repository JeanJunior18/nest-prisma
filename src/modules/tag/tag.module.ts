import { TagRepositoryProvider } from '@adapters/repositories';
import { Module } from '@nestjs/common';
import { TagRestController } from '@tag/interface/rest.controller';
import { CreateTagService, UpdateTagService } from '@tag/useCases/command';
import { FindOneTagService, FindTagService } from '@tag/useCases/queries';

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
