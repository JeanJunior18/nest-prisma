import { Note } from '@note/domain/model/note.entity';
import { CreateNoteDto } from '@note/interface/dto';

export abstract class NoteRepositoryPort {
  create: (note: CreateNoteDto) => Promise<Note>;
  find: (params?: any) => Promise<Note[]>;
}
