import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateNoteDto, UpdateNoteDto } from '@note/interface/dto';
import { UpdateNoteService } from 'src/modules/note/core/services/useCases/commands';
import { CreateNoteService } from 'src/modules/note/core/services/useCases/commands/create-note.service';
import { FindNotesService } from 'src/modules/note/core/services/useCases/queries';

@Controller('note')
export class NoteRestController {
  private readonly logger = new Logger(NoteRestController.name);

  constructor(
    private readonly findNotes: FindNotesService,
    private readonly createNote: CreateNoteService,
    private readonly updateNote: UpdateNoteService,
  ) {}

  @Get()
  find() {
    this.logger.log('Request to find notes');
    return this.findNotes.find();
  }

  @Post()
  create(@Body() data: CreateNoteDto) {
    this.logger.log('Request to create note');

    return this.createNote.execute(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateNoteDto) {
    this.logger.log(`Request to update note: ${id}`);

    return this.updateNote.execute(id, data);
  }
}
