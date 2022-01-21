import { IsNumberString, IsOptional } from 'class-validator';

export class QueryParamsTagDto {
  @IsNumberString()
  @IsOptional()
  limit?: number;

  @IsNumberString()
  @IsOptional()
  page?: number;
}
