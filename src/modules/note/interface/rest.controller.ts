import { JwtStrategy } from '@auth/strategies';
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
  UseGuards,
} from '@nestjs/common';
import {
  CreateNoteDto,
  QueryParamsNoteDto,
  UpdateNoteDto,
} from '@note/interface/dto';
import { CreateNoteService, UpdateNoteService } from '@note/useCases';
import { FindNotesService, FindOneNoteService } from '@note/useCases';

@UseGuards(JwtStrategy)
@Controller('note')
export class NoteRestController {
  private readonly logger = new Logger(NoteRestController.name);

  constructor(
    private readonly findNotesService: FindNotesService,
    private readonly findOneNoteService: FindOneNoteService,
    private readonly createNoteService: CreateNoteService,
    private readonly updateNoteService: UpdateNoteService,
  ) {}

  @UseGuards(JwtStrategy)
  @Get()
  async findAll(@Query() query: QueryParamsNoteDto) {
    this.logger.log('Request to find all notes');

    return this.findNotesService.execute(query);
  }

  @UseGuards(JwtStrategy)
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
