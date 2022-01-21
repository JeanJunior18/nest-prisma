import { NoteModule, TagModule } from '@modules';
import { Module } from '@nestjs/common';
import { PrismaModule } from '@plugins/prisma';

@Module({
  imports: [PrismaModule, NoteModule, TagModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
