import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { SharedModelsModule } from '@creation-mono/shared/models';
import { SharedLoggerModule } from '@creation-mono/shared/logger';
import { DateTimeScalar, DecimalScalar } from '@creation-mono/shared/types';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { TagModule } from './tag/tag.module';
import { TransactionModule } from './transaction/transaction.module';
import { TransactionsTagsModule } from './transactions-tags/transactions-tags.module';
import { GqlThrottlerGuard } from '../common/guards/gql-throttle.guard';

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: [
        'libs/shared/types/.mesh/*.graphql',
        'libs/shared/types/src/**/*.graphql',
      ],
      cors: {
        origin: [process.env.ORIGIN],
        methods: ['POST'],
        credentials: true,
      },
    }),
    AuthModule,
    UserModule,
    SharedModelsModule,
    CategoryModule,
    TagModule,
    TransactionModule,
    TransactionsTagsModule,
    ThrottlerModule.forRoot({
      ttl: Number(process.env.THROTTLE_TTL) || 60,
      limit: Number(process.env.THROTTLE_LIMIT) || 10,
    }),
    SharedLoggerModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'frontend'),
    }),
  ],
  providers: [
    DateTimeScalar,
    DecimalScalar,
    {
      provide: APP_GUARD,
      useClass: GqlThrottlerGuard,
    },
  ],
})
export class AppModule {}
