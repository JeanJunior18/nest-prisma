import { LocalStrategy } from '@auth/strategies';
import { AuthUserService, LoginService } from '@auth/useCases';
import { Module } from '@nestjs/common';
import { AuthController } from '@auth/interface/rest.controller';
import { UserModule } from '@modules';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthUserService, LocalStrategy, LoginService],
  exports: [AuthUserService],
})
export class AuthModule {}
