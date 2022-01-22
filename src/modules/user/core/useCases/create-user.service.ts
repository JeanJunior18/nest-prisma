import { HttpException, Injectable, Logger } from '@nestjs/common';
import { UserRepositoryPort } from '@ports/repository';
import { User } from '@user/domain/user.entity';
import { CreateUserDto } from '@user/interface/dto';
import bcrypt from 'bcryptjs';

@Injectable()
export class CreateUserService {
  private readonly logger = new Logger(CreateUserService.name);

  constructor(private readonly userRepository: UserRepositoryPort) {}

  async execute(data: CreateUserDto): Promise<User> {
    this.logger.log(`Creating user of: ${data.name} ${data.email}`);

    const alreadyExists = await this.userRepository.findByEmail(data.email);

    if (alreadyExists)
      throw new HttpException(`User ${data.email} already exists`, 409);

    data.password = bcrypt.hashSync(data.password, 10);

    return this.userRepository.create(data);
  }
}
