import { NoteModule } from '@modules';
import { Module } from '@nestjs/common';
import { PrismaModule } from '@plugins/prisma';
import { TagModule } from 'src/modules/tag/tag.module';

@Module({
  imports: [PrismaModule, NoteModule, TagModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
