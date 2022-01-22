import { NoteModule, TagModule, UserModule } from '@modules';
import { Module } from '@nestjs/common';
import { PrismaModule } from '@plugins/prisma';

@Module({
  imports: [PrismaModule, NoteModule, TagModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
