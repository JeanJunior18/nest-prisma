import { Note } from '@note/domain/model/note.entity';
import { CreateNoteDto, UpdateNoteDto } from '@note/interface/dto';

export abstract class NoteRepositoryPort {
  create: (note: CreateNoteDto) => Promise<Note>;
  find: (params?: any) => Promise<Note[]>;
  findOne: (id: string) => Promise<Note>;
  update: (id: string, data: UpdateNoteDto) => Promise<Note>;
}
