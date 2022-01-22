import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from '@user/interface/dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
