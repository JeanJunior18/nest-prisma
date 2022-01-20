import {
  Body,
  Controller,
  Get,
  Logger,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateNoteDto, UpdateNoteDto } from '@note/interface/dto';
import {
  UpdateNoteService,
  CreateNoteService,
} from 'src/modules/note/core/services/useCases/commands';
import {
  FindNotesService,
  FindOneNoteService,
} from 'src/modules/note/core/services/useCases/queries';

@Controller('note')
export class NoteRestController {
  private readonly logger = new Logger(NoteRestController.name);

  constructor(
    private readonly findNotesService: FindNotesService,
    private readonly findOneNoteService: FindOneNoteService,
    private readonly createNoteService: CreateNoteService,
    private readonly updateNoteService: UpdateNoteService,
  ) {}

  @Get()
  find() {
    this.logger.log('Request to find notes');

    return this.findNotesService.execute();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    this.logger.log(`Request to find note: ${id}`);

    const note = await this.findOneNoteService.execute(id);

    if (!note) throw new NotFoundException(`Note with id: ${id} not found`);
    return note;
  }

  @Post()
  create(@Body() data: CreateNoteDto) {
    this.logger.log('Request to create note');

    return this.createNoteService.execute(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateNoteDto) {
    this.logger.log(`Request to update note: ${id}`);

    return this.updateNoteService.execute(id, data);
  }
}
