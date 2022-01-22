import {
  Body,
  Controller,
  Delete,
  Logger,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { User } from '@user/domain/user.entity';
import { CreateUserDto, UpdateUserDto } from '@user/interface/dto';
import {
  CreateUserService,
  DeleteUserService,
  UpdateUserService,
} from '@user/useCases';

@Controller('user')
export class UserRestController {
  private readonly logger = new Logger(UserRestController.name);

  constructor(
    private readonly createUserService: CreateUserService,
    private readonly updateUserService: UpdateUserService,
    private readonly deleteUserService: DeleteUserService,
  ) {}

  @Post()
  create(@Body() data: CreateUserDto): Promise<User> {
    this.logger.log('Creating user');

    return this.createUserService.execute(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateUserDto): Promise<User> {
    this.logger.log('Updating user');

    return this.updateUserService.execute(id, data);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    this.logger.log('Deleting user');

    return this.deleteUserService.execute(id);
  }
}
