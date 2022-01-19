import { NoteModule } from '@modules';
import { Module } from '@nestjs/common';
import { PrismaModule } from '@plugins/prisma';

@Module({
  imports: [PrismaModule, NoteModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
