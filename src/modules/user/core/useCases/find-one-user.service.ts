import { Injectable, Logger } from '@nestjs/common';
import { UserRepositoryPort } from '@ports/repository';
import { User } from '@user/domain/user.entity';

@Injectable()
export class FindOneUserService {
  private readonly logger = new Logger(FindOneUserService.name);

  constructor(private readonly userRepository: UserRepositoryPort) {}

  findByEmail(email: string): Promise<User> {
    this.logger.log(`Find user by email: ${email}`);

    return this.userRepository.findByEmail(email);
  }
}
