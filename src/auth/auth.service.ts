import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginResponse, User } from 'src/graphql/graphqlTypes';
import { RegisterUserInput } from 'src/graphql/graphqlTypes';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pw: string): Promise<any> {
    const user = await this.usersService.findUser(email);

    if (!user) {
      return null;
    }

    const isPasswordCorrect = await bcrypt.compare(pw, user.password);

    if (!isPasswordCorrect) {
      throw new BadRequestException('Invalid password!');
    }

    const { password, ...result } = user;
    return result;
  }

  async login(user: User): Promise<LoginResponse> {
    return {
      access_token: this.jwtService.sign({ email: user.email, sub: user.id }),
      user,
    };
  }

  async register(registerUserInput: RegisterUserInput): Promise<User> {
    if (registerUserInput.password !== registerUserInput.password_confirm) {
      throw new BadRequestException('Passwords are not match!');
    }

    const user = await this.usersService.findUser(registerUserInput.email);

    if (user) {
      throw new BadRequestException('Email is already exists!');
    }

    const hashedPassword = await bcrypt.hash(registerUserInput.password, 12);

    const newUser = await this.usersService.createUser(
      registerUserInput.email,
      hashedPassword,
    );

    return newUser;
  }
}
