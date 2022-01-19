import { Controller, Get, Logger } from '@nestjs/common';
import { FindNotesService } from 'src/modules/note/core/services/useCases/queries';

@Controller('note')
export class NoteRestController {
  private readonly logger = new Logger(NoteRestController.name);

  constructor(private readonly findNotes: FindNotesService) {}

  @Get()
  find() {
    this.logger.log('Request to find notes');
    return this.findNotes.find();
  }
}
