import { AuthModule, NoteModule, TagModule, UserModule } from '@modules';
import { Module } from '@nestjs/common';
import { PrismaModule } from '@plugins/prisma';

@Module({
  imports: [AuthModule, PrismaModule, NoteModule, TagModule, UserModule],
})
export class AppModule {}
