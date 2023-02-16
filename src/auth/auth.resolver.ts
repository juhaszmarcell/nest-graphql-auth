import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginResponse } from 'src/graphql/graphqlTypes';
import { User } from 'src/graphql/graphqlTypes';
import { RegisterUserInput } from './dto/register-user.input';
import { UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local.guard';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation()
  @UseGuards(LocalAuthGuard)
  async login(@Context() context): Promise<LoginResponse> {
    return await this.authService.login(context.user);
  }

  @Mutation()
  async register(
    @Args('registerUserInput') registerUserInput: RegisterUserInput,
  ): Promise<User> {
    return await this.authService.register(registerUserInput);
  }
}
