import { TagRepositoryProvider } from '@adapters/repositories';
import { Module } from '@nestjs/common';
import { TagRestController } from '@tag/interface/rest.controller';
import {
  CreateTagService,
  UpdateTagService,
} from 'src/modules/tag/core/services/useCases/command';
import { FindTagService } from 'src/modules/tag/core/services/useCases/queries';

@Module({
  controllers: [TagRestController],
  providers: [
    TagRepositoryProvider,
    CreateTagService,
    FindTagService,
    UpdateTagService,
  ],
})
export class TagModule {}
