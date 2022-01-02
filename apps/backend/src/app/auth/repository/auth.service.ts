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
    const user = await this.userService.simpleUser({
      email,
      username,
    });

    if (!user || user.password !== password) throw new UnauthorizedException();
    delete user.password;
    return user;
  }

  async registerUser(
    user: Prisma.UserCreateInput,
    password: string
  ): Promise<User> {
    const registerUser = await this.userService.createUser({
      ...user,
      password,
    });
    delete registerUser.password;
    return registerUser;
  }
}
