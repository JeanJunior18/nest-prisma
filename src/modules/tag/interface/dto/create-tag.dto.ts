import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTagDto {
  @IsString()
  @IsOptional()
  userId: string;

  @IsNotEmpty()
  @IsString()
  name: string;
}
