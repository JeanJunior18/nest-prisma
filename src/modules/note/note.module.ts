import { Module } from '@nestjs/common';
import { NoteRestController } from '@note/interface/rest.controller';
import { NoteRepositoryProvider } from '@adapters/repositories';
import {
  FindNotesService,
  FindOneNoteService,
} from 'src/modules/note/core/services/useCases/queries';
import { CreateNoteService } from 'src/modules/note/core/services/useCases/commands/create-note.service';
import { UpdateNoteService } from 'src/modules/note/core/services/useCases/commands';

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
