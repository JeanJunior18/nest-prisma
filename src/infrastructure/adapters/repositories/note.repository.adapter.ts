import { Injectable, Logger, Provider } from '@nestjs/common';
import { Note } from '@note/domain/model/note.entity';
import { NoteRepositoryPort } from '@ports/repository';
import { PrismaService } from '@plugins/prisma';
import {
  CreateNoteDto,
  QueryParamsNoteDto,
  UpdateNoteDto,
} from '@note/interface/dto';
import { Pagination } from '@ports/utils';

@Injectable()
export class NoteRepositoryAdapter implements NoteRepositoryPort {
  private readonly logger = new Logger(NoteRepositoryAdapter.name);

  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateNoteDto): Promise<Note> {
    this.logger.log(`Creating note: ${JSON.stringify(data)}`);
    return this.prisma.note.create({ data });
  }

  async find(query?: QueryParamsNoteDto): Promise<Pagination<Note>> {
    this.logger.log(`Finding notes with params: ${JSON.stringify(query)}`);

    const limit = +query?.limit || 10;
    const page = +query?.page || 1;
    const results = await this.prisma.note.findMany({
      take: limit,
      skip: (page - 1) * limit,
    });
    const total = await this.prisma.note.count();

    return new Pagination<Note>(
      total,
      page,
      limit,
      Math.ceil(total / limit),
      results,
    );
  }

  findOne(id: string): Promise<Note> {
    this.logger.log(`Finding note: ${id}`);
    return this.prisma.note.findUnique({ where: { id } });
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
