import { IsNumberString, IsOptional, IsString } from 'class-validator';

export class QueryParamsTagDto {
  @IsString()
  @IsOptional()
  userId: string;

  @IsNumberString()
  @IsOptional()
  limit?: number;

  @IsNumberString()
  @IsOptional()
  page?: number;
}
