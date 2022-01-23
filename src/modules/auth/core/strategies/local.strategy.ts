import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@user/domain/user.entity';
import { Strategy } from 'passport-local';
import { AuthUserService } from 'src/modules/auth/core/useCases/auth-user.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private readonly logger = new Logger(LocalStrategy.name);

  constructor(private readonly authService: AuthUserService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string): Promise<User> {
    const user = await this.authService.execute(email, password);

    if (!user) throw new UnauthorizedException();

    this.logger.log(`User ${user.email} successfully validated`);
    return user;
  }
}
