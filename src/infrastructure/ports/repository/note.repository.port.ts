import { Note } from '@note/domain/note.entity';
import {
  CreateNoteDto,
  QueryParamsNoteDto,
  UpdateNoteDto,
} from '@note/interface/dto';
import { Pagination } from '@ports/utils';

export abstract class NoteRepositoryPort {
  create: (note: CreateNoteDto) => Promise<Note>;
  find: (query?: QueryParamsNoteDto) => Promise<Pagination<Note>>;
  findOne: (id: string) => Promise<Note>;
  update: (id: string, data: UpdateNoteDto) => Promise<Note>;
}
