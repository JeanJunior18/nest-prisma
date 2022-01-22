import { Injectable, Logger } from '@nestjs/common';
import { UserRepositoryPort } from '@ports/repository';
import { User } from '@user/domain/user.entity';
import { UpdateUserDto } from '@user/interface/dto';

@Injectable()
export class UpdateUserService {
  private readonly logger = new Logger(UpdateUserService.name);

  constructor(private readonly userRepository: UserRepositoryPort) {}

  execute(id: string, data: UpdateUserDto): Promise<User> {
    this.logger.log(`Updating user of: ${data.name} ${data.email}`);

    return this.userRepository.update(id, data);
  }
}
