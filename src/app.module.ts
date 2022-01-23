import { AuthUserService } from '@auth/useCases';
import { AuthModule, NoteModule, TagModule, UserModule } from '@modules';
import { Module } from '@nestjs/common';
import { PrismaModule } from '@plugins/prisma';

@Module({
  imports: [AuthModule, PrismaModule, NoteModule, TagModule, UserModule],
  providers: [AuthUserService],
})
export class AppModule {}
