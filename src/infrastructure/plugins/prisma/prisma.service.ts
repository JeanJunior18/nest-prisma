import {
  INestApplication,
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  async onModuleInit() {
    this.logger.log('Connecting to Prisma database');
    await this.$connect();
    this.logger.log('Connected to Prisma database');
  }

  async onModuleDestroy() {
    this.logger.log('Disconnecting from Prisma database');
    await this.$disconnect();
    this.logger.log('Disconnected from Prisma database');
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
