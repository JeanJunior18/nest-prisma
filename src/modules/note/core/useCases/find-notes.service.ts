import { Injectable } from '@nestjs/common';
import { Note } from '@note/domain/note.entity';
import { QueryParamsNoteDto } from '@note/interface/dto';
import { NoteRepositoryPort } from '@ports/repository';
import { Pagination } from '@ports/utils';

@Injectable()
export class FindNotesService {
  constructor(private readonly noteRepository: NoteRepositoryPort) {}

  execute(query?: QueryParamsNoteDto): Promise<Pagination<Note>> {
    return this.noteRepository.find(query);
  }
}
