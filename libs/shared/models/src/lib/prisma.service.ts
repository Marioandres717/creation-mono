import { PrismaClient } from '.prisma/client';
import { LoggerService } from '@creation-mono/shared/logger';
import {
  INestApplication,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(private loggerService: LoggerService) {
    super({
      log: [
        {
          emit: 'event',
          level: 'query',
        },
        {
          emit: 'event',
          level: 'error',
        },
        {
          emit: 'event',
          level: 'info',
        },
        {
          emit: 'event',
          level: 'warn',
        },
      ],
    });
    this.loggerService.setContext('PrismaService');
    this.$on('query' as never, (e: Prisma.QueryEvent) => {
      this.loggerService.info(JSON.stringify(e));
    });
    this.$on('error' as never, (e: Prisma.LogEvent) => {
      this.loggerService.error(JSON.stringify(e));
    });
    this.$on('info' as never, (e: Prisma.LogEvent) => {
      this.loggerService.info(JSON.stringify(e));
    });
    this.$on('warn' as never, (e: Prisma.LogEvent) => {
      this.loggerService.warn(JSON.stringify(e));
    });
  }
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
