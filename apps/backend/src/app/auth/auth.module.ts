import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthService } from './repository/auth.service';
import { JwtStrategy } from '../../common/strategies/jwt';
import { AuthQueriesResolver } from './resolvers/auth-queries.resolver';
import { AuthMutationsResolver } from './resolvers/auth-mutations.resolver';
import { LoggerService } from '@creation-mono/shared/logger';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.TOKEN_DURATION },
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    AuthQueriesResolver,
    AuthMutationsResolver,
    LoggerService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
