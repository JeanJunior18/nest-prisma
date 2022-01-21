import { Injectable, Logger } from '@nestjs/common';
import { CreateNoteDto } from '@note/interface/dto';
import { NoteRepositoryPort } from '@ports/repository';

@Injectable()
export class CreateNoteService {
  private readonly logger = new Logger(CreateNoteService.name);

  constructor(private noteRepository: NoteRepositoryPort) {}

  async execute(data: CreateNoteDto) {
    this.logger.log(`Creating note: ${JSON.stringify(data)}`);

    const note = await this.noteRepository.create(data);

    this.logger.log(`Created note: ${JSON.stringify(note)}`);

    return note;
  }
}
