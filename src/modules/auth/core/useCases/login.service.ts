import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@user/domain/user.entity';

@Injectable()
export class LoginService {
  private readonly logger = new Logger(LoginService.name);

  constructor(private readonly jwtService: JwtService) {}

  execute(user: User) {
    this.logger.log(`User ${user.name} logged in`);

    const payload = { name: user.name, email: user.email, id: user.id };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
