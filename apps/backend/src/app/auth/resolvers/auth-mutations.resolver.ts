import { User } from '@creation-mono/shared/types';
import { Mutation, Resolver } from '@nestjs/graphql';
import UserValidationPipe from '../../user/validators';
import { AuthService } from '../repository/auth.service';

@Resolver()
export class AuthMutationsResolver {
  constructor(private authService: AuthService) {}

  @Mutation('signUp')
  async signUp(user: UserValidationPipe, password: string): Promise<User> {
    return (await this.authService.registerUser(user, password)) as User;
  }
}
