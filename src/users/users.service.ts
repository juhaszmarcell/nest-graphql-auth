import { Injectable } from '@nestjs/common';
import { Users } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  findAll() {
    return `This action returns all users`;
  }

  async findUser(email: string): Promise<Users> {
    const user = await this.prisma.users.findUnique({
      where: {
        email,
      },
    });
    return user;
  }

  async createUser(email: string, password: string): Promise<any> {
    const newUser = await this.prisma.users.create({
      data: {
        email,
        password,
      },
      select: {
        id: true,
        email: true,
        password: false,
      },
    });

    return newUser;
  }
}
