import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateNoteDto {
  @IsString()
  @IsOptional()
  userId: string;

  @IsString()
  title: string;

  @IsString()
  @IsNotEmpty()
  text: string;
}
