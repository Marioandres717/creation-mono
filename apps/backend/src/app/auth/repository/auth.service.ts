import { Prisma, User } from '.prisma/client';
import { Injectable } from '@nestjs/common';
import { UserService } from '../../user/repository/user.service';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async validateUser(user: Prisma.UserWhereUniqueInput): Promise<User> {
    return await this.userService.user({ id: user.id });
  }
}
