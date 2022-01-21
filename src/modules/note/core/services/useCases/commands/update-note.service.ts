import { Injectable, Logger } from '@nestjs/common';
import { Note } from '@note/domain/model/note.entity';
import { UpdateNoteDto } from '@note/interface/dto';
import { NoteRepositoryPort } from '@ports/repository';

@Injectable()
export class UpdateNoteService {
  private readonly logger = new Logger(UpdateNoteService.name);

  constructor(private readonly noteRepository: NoteRepositoryPort) {}

  execute(id: string, data: UpdateNoteDto): Promise<Note> {
    this.logger.log(`Updating note: ${id} with data: ${JSON.stringify(data)}`);

    return this.noteRepository.update(id, data);
  }
}
