import { Injectable } from '@nestjs/common';
import { NoteRepositoryPort } from '@ports';

@Injectable()
export class FindNotesService {
  constructor(private readonly noteRepository: NoteRepositoryPort) {}

  find() {
    return this.noteRepository.find();
  }
}
