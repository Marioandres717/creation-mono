import { Prisma, User } from '.prisma/client';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../user/repository/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(
    { email, username }: Prisma.UserWhereUniqueInput,
    password: string
  ): Promise<User> {
    const user = await this.userService.user({
      email,
      username,
    });

    if (!user || user.password !== password) throw new UnauthorizedException();
    user.password = null;
    return user;
  }

  registerUser(user: Prisma.UserCreateInput, password: string): Promise<User> {
    return this.userService.createUser({
      ...user,
      password,
    });
  }
}
