import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '@creation-mono/shared/types';
import { jwtConstants } from './constants';
import { UserService } from '../../app/user/repository/user.service';

interface UserInJWT extends User {
  _csrf: string;
  exp: number;
  iat: number;
}
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private userService: UserService,
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
            if (!decodedToken || decodedToken['_csrf'] !== csrfToken)
              throw new UnauthorizedException();
          }
          return token;
        },
      ]),
      ignoreExpiration: process.env.NODE_ENV || false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(userInJWT: UserInJWT) {
    const { id, email, username } = userInJWT;
    const user = await this.userService.simpleUser({ id, email, username });
    if (!user) return;
    delete user.password;
    return user;
  }
}
