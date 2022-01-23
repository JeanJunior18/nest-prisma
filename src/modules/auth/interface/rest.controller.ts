import { LocalAuthGuard } from '@auth/guards/local-auth.guard';
import { LoginService } from '@auth/useCases';
import { Controller, Logger, Post, Request, UseGuards } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly loginService: LoginService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    this.logger.log(`User ${req.user.username} has logged in`);

    return this.loginService.execute(req.user);
  }
}
