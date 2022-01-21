import { IsNumberString, IsOptional } from 'class-validator';

export class QueryParamsNoteDto {
  @IsNumberString()
  @IsOptional()
  limit?: number;

  @IsNumberString()
  @IsOptional()
  page?: number;
}
