import { RequestWithUser } from '@auth/interface/dto';
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
  Req,
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
  async findAll(
    @Req() request: RequestWithUser,
    @Query() query: QueryParamsNoteDto,
  ) {
    this.logger.log(`Request to find notes of user: ${request.user.email}`);

    const userId = request.user.id;

    return this.findNotesService.execute({ ...query, userId });
  }

  @UseGuards(JwtStrategy)
  @Get(':id')
  async findOne(@Req() request: RequestWithUser, @Param('id') id: string) {
    this.logger.log(`Request to find note: ${id}`);

    const userId = request.user.id;

    const note = await this.findOneNoteService.execute(id);

    if (!note || note.userId !== userId)
      throw new NotFoundException(`Note with id: ${id} not found`);
    return note;
  }

  @Post()
  create(@Req() request: RequestWithUser, @Body() data: CreateNoteDto) {
    this.logger.log('Request to create note');

    const userId = request.user.id;

    return this.createNoteService.execute({ ...data, userId });
  }

  @Put(':id')
  update(
    @Req() request: RequestWithUser,
    @Param('id') id: string,
    @Body() data: UpdateNoteDto,
  ) {
    this.logger.log(`Request to update note: ${id}`);

    const userId = request.user.id;

    return this.updateNoteService.execute(id, { ...data, userId });
  }
}
