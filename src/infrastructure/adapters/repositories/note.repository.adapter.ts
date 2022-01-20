import { Injectable, Logger, Provider } from '@nestjs/common';
import { Note } from '@note/domain/model/note.entity';
import { NoteRepositoryPort } from '@ports';
import { PrismaService } from '@plugins/prisma';
import { CreateNoteDto, UpdateNoteDto } from '@note/interface/dto';

@Injectable()
export class NoteRepositoryAdapter implements NoteRepositoryPort {
  private readonly logger = new Logger(NoteRepositoryAdapter.name);

  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateNoteDto): Promise<Note> {
    this.logger.log(`Creating note: ${JSON.stringify(data)}`);
    return this.prisma.note.create({ data });
  }

  find(params = {}): Promise<Note[]> {
    this.logger.log(`Finding notes with params: ${JSON.stringify(params)}`);
    return this.prisma.note.findMany(params);
  }

  update(id: string, data: UpdateNoteDto): Promise<Note> {
    this.logger.log(`Updating note: ${id} with data: ${JSON.stringify(data)}`);
    return this.prisma.note.update({
      where: { id },
      data,
    });
  }
}

export const NoteRepositoryProvider: Provider = {
  provide: NoteRepositoryPort,
  useClass: NoteRepositoryAdapter,
};
