import {
  LoggerService,
  SharedLoggerModule,
} from '@creation-mono/shared/logger';
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  imports: [SharedLoggerModule],
  providers: [PrismaService, LoggerService],
  exports: [PrismaService],
})
export class SharedModelsModule {}
