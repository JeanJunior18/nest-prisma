import { Injectable } from '@nestjs/common';
import { NoteRepositoryPort } from '@ports';

@Injectable()
export class FindNotesService {
  constructor(private readonly noteRepository: NoteRepositoryPort) {}

  execute() {
    return this.noteRepository.find();
  }
}
