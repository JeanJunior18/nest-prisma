import { CreateNoteDto } from '@note/interface/dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateNoteDto extends PartialType(CreateNoteDto) {}
