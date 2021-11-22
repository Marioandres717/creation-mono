import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthService } from './repository/auth.service';
import { jwtConstants } from './constants';
import { JwtStrategy } from './strategies/jwt';
import { AuthQueriesResolver } from './resolvers/auth-queries.resolver';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '30m' },
    }),
  ],
  providers: [AuthService, JwtStrategy, AuthQueriesResolver],
  exports: [AuthService],
})
export class AuthModule {}
