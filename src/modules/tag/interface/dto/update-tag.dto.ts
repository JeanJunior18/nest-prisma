import { PartialType } from '@nestjs/mapped-types';
import { CreateTagDto } from '@tag/interface/dto';

export class UpdateTagDto extends PartialType(CreateTagDto) {}
