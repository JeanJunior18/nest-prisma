import { Module } from '@nestjs/common';
import { NoteRestController } from '@note/interface/rest.controller';
import { NoteRepositoryProvider } from '@adapters/repositories';
import { FindNotesService } from 'src/modules/note/core/services/useCases/queries';

@Module({
  controllers: [NoteRestController],
  providers: [NoteRepositoryProvider, FindNotesService],
})
export class NoteModule {}
