import { Global, Module } from '@nestjs/common';
import { PrismaService } from '@plugins/prisma';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
