import { Note } from '@note/domain/model/note.entity';

export abstract class NoteRepositoryPort {
  create: (note: Note) => Promise<Note>;
  find: (params?: any) => Promise<Note[]>;
}
