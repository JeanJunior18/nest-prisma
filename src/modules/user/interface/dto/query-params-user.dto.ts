import { IsNumberString, IsOptional } from 'class-validator';

export class QueryParamsUserDto {
  @IsNumberString()
  @IsOptional()
  page: number;

  @IsNumberString()
  @IsOptional()
  limit: number;
}
