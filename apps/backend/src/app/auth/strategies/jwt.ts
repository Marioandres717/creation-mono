import { User } from '.prisma/client';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../repository/auth.service';
import { jwtConstants } from '../constants';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => {
          let token = null;
          if (req && req.cookies) {
            token = req.cookies['access-token'];
            const decodedToken = this.jwtService.decode(token);
            const csrfToken = req.headers['csrf-token'];
            if (decodedToken['_csrf'] !== csrfToken)
              throw new UnauthorizedException();
          }
          return token;
        },
      ]),
      ignoreExpiration: process.env.NODE_ENV || false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(user: User) {
    return await this.authService.validateUser(user);
  }
}
