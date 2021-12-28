import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as helmet from 'helmet';
import * as cookieParser from 'cookie-parser';

import { AppModule } from './app/app.module';
import { AllExceptionFilter } from './app/filters';
import { TimeoutInterceptor } from './app/interceptors/timeout.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
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
  if (process.env.NODE_ENV === 'production') {
    app.useGlobalFilters(new AllExceptionFilter());
  }
  const port = process.env.PORT || 3000;
  await app.listen(port);

  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
  Logger.log(
    `🚀 Graphql playground is running on: http://localhost:${port}/graphql`
  );
}

bootstrap();
