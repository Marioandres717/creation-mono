import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { SharedModelsModule } from '@creation-mono/shared/models';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { TagModule } from './tag/tag.module';
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
  ],
  providers: [],
})
export class AppModule {}
