import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import { SharedModelsModule } from '@creation-mono/shared/models';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { TagModule } from './tag/tag.module';
import { TransactionModule } from './transaction/transaction.module';
import { TransactionsTagsModule } from './transactions-tags/transactions-tags.module';
import { DateTimeScalar } from './scalars/date-time.scalar';
import { DecimalScalar } from './scalars/decimal.scalar';
import { GqlThrottlerGuard } from './auth/guards/gql-throttle.guard';
import { LoggerModule } from './logger';

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: [
        'libs/shared/types/.mesh/*.graphql',
        'libs/shared/types/src/**/*.graphql',
      ],
      cors: {
        // TODO: Add origin for production and use env variable here
        origin: ['http://localhost:4200'],
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
    LoggerModule,
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
