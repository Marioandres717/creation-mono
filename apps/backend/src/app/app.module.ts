import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      typePaths: ['./apps/backend/.mesh/*.graphql', './**/api/*.graphql'],
      definitions: {
        path: join(process.cwd(), 'apps/backend/src/app/graphql.ts'),
        emitTypenameField: true,
      },
    }),
    AuthModule,
    UserModule,
  ],
  providers: [],
})
export class AppModule {}
