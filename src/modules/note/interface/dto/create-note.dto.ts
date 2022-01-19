import { IsString, IsNotEmpty } from 'class-validator';

export class CreateNoteDto {
  @IsString()
  title: string;

  @IsString()
  @IsNotEmpty()
  text: string;
}
