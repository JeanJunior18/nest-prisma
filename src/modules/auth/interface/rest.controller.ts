import { Public } from '@auth/decorators';
import { JwtAuthGuard } from '@auth/guards';
import { LocalAuthGuard } from '@auth/guards/local-auth.guard';
import { LoginService } from '@auth/useCases';
import {
  Controller,
  Get,
  Logger,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly loginService: LoginService) {}

  @UseGuards(JwtAuthGuard)
  @Get('ping')
  test() {
    return { ping: 'pong' };
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    this.logger.log(`User ${req.user.email} has logged in`);

    return this.loginService.execute(req.user);
  }
}
