import {
  Body,
  Controller,
  Get,
  Logger,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  CreateNoteDto,
  QueryParamsNoteDto,
  UpdateNoteDto,
} from '@note/interface/dto';
import { CreateNoteService, UpdateNoteService } from '@note/useCases/commands';
import { FindNotesService, FindOneNoteService } from '@note/useCases/queries';

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
  find(@Query() query: QueryParamsNoteDto) {
    this.logger.log('Request to find notes');

    return this.findNotesService.execute(query);
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
