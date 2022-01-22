import { Module } from '@nestjs/common';
import { NoteRestController } from '@note/interface/rest.controller';
import { NoteRepositoryProvider } from '@adapters/repositories';
import { FindNotesService, FindOneNoteService } from '@note/useCases';
import { CreateNoteService, UpdateNoteService } from '@note/useCases';

@Module({
  controllers: [NoteRestController],
  providers: [
    NoteRepositoryProvider,
    FindNotesService,
    FindOneNoteService,
    CreateNoteService,
    UpdateNoteService,
  ],
})
export class NoteModule {}
