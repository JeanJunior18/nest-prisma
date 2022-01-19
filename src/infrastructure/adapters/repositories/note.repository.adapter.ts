import { Injectable, Logger, Provider } from '@nestjs/common';
import { Note } from '@note/domain/model/note.entity';
import { NoteRepositoryPort } from '@ports';
import { PrismaService } from '@plugins/prisma';

@Injectable()
export class NoteRepositoryAdapter implements NoteRepositoryPort {
  private readonly logger = new Logger(NoteRepositoryAdapter.name);

  constructor(private readonly prisma: PrismaService) {}

  create(note: Note): Promise<Note> {
    this.logger.log(`Creating note: ${JSON.stringify(note)}`);
    return this.prisma.note.create({ data: note });
  }

  find(params = {}): Promise<Note[]> {
    this.logger.log(`Finding notes with params: ${JSON.stringify(params)}`);
    return this.prisma.note.findMany(params);
  }
}

export const NoteRepositoryProvider: Provider = {
  provide: NoteRepositoryPort,
  useClass: NoteRepositoryAdapter,
};
