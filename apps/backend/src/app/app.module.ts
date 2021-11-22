import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { SharedModelsModule } from '@creation-mono/shared/models';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: [
        'libs/shared/types/.mesh/*.graphql',
        'libs/shared/types/src/**/*.graphql',
      ],
    }),
    AuthModule,
    UserModule,
    SharedModelsModule,
  ],
  providers: [],
})
export class AppModule {}
