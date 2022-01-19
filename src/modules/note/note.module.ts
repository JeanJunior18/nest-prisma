import { Module } from '@nestjs/common';
import { NoteRestController } from '@note/interface/rest.controller';
import { NoteRepositoryProvider } from '@adapters/repositories';
import { FindNotesService } from 'src/modules/note/core/services/useCases/queries';
import { CreateNoteService } from 'src/modules/note/core/services/useCases/commands/create-note.service';

@Module({
  controllers: [NoteRestController],
  providers: [NoteRepositoryProvider, FindNotesService, CreateNoteService],
})
export class NoteModule {}
