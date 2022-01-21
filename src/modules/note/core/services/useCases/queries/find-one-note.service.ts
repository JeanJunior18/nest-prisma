import { Injectable, Logger } from '@nestjs/common';
import { Note } from '@note/domain/model/note.entity';
import { NoteRepositoryPort } from '@ports/repository';

@Injectable()
export class FindOneNoteService {
  private readonly logger = new Logger(FindOneNoteService.name);

  constructor(private readonly noteRepository: NoteRepositoryPort) {}

  execute(id: string): Promise<Note> {
    this.logger.log(`Finding note: ${id}`);
    return this.noteRepository.findOne(id);
  }
}
