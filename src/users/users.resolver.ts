import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CurrentUser } from './decorators/current-user.decorator';

@Resolver(/*() => User*/)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query('findAll' /*() => [User], { name: 'users' }*/)
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.usersService.findAll();
  }

  @Query('findOne' /*() => User, { name: 'user' }*/)
  async findOne(
    @Args('email', { type: () => String }) email: string,
  ): Promise<any> {
    return await this.usersService.findUser(email);
  }

  @Query('getCurrentUser')
  @UseGuards(JwtAuthGuard)
  async getCurrentUser(@CurrentUser() user: any) {
    console.log(user);
    return await this.usersService.findUser(user.email);
  }
}
