import { Injectable, Logger } from '@nestjs/common';
import { User } from '@user/domain/user.entity';
import { FindOneUserService } from '@user/useCases';
import bcrypt from 'bcryptjs';

@Injectable()
export class AuthUserService {
  private readonly logger = new Logger(AuthUserService.name);

  constructor(private readonly findUser: FindOneUserService) {}

  async execute(email: string, password: string): Promise<User> {
    this.logger.log(`Find user by email: ${email}`);

    const user = await this.findUser.findByEmail(email);

    if (user && bcrypt.compareSync(password, user.password)) return user;

    return null;
  }
}
