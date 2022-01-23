import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app/app.module';
import { AllExceptionFilter } from './common/filters/all-exception.filter';
import { TimeoutInterceptor } from './common/interceptors/timeout.interceptor';
import { LoggerService } from '@creation-mono/shared/logger';
import { PrismaService } from '@creation-mono/shared/models';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    abortOnError: false,
  });
  app.use(
    helmet({
      contentSecurityPolicy:
        process.env.NODE_ENV === 'production' ? undefined : false,
    })
  );
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      skipMissingProperties: true,
    })
  );
  app.useGlobalInterceptors(new TimeoutInterceptor());
  app.useLogger(new LoggerService());
  const prismaService: PrismaService = app.get(PrismaService);
  prismaService.enableShutdownHooks(app);
  if (process.env.NODE_ENV === 'production') {
    app.useGlobalFilters(new AllExceptionFilter(new LoggerService()));
  }
  const port = process.env.PORT || 3000;
  await app.listen(port);

  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
  Logger.log(
    `🚀 Graphql playground is running on: http://localhost:${port}/graphql`
  );
}

bootstrap();
