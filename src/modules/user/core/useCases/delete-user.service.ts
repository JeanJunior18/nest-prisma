import { Injectable, Logger } from '@nestjs/common';
import { UserRepositoryPort } from '@ports/repository';

@Injectable()
export class DeleteUserService {
  private readonly logger = new Logger(DeleteUserService.name);

  constructor(private readonly userRepository: UserRepositoryPort) {}

  execute(id: string): Promise<void> {
    this.logger.log(`Deleting user of: ${id}`);

    return this.userRepository.delete(id);
  }
}
