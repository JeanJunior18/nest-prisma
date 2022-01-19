import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { CreateNoteDto } from '@note/interface/dto';
import { CreateNoteService } from 'src/modules/note/core/services/useCases/commands/create-note.service';
import { FindNotesService } from 'src/modules/note/core/services/useCases/queries';

@Controller('note')
export class NoteRestController {
  private readonly logger = new Logger(NoteRestController.name);

  constructor(
    private readonly findNotes: FindNotesService,
    private readonly createNote: CreateNoteService,
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
}
