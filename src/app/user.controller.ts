import { Controller, Post, Body } from '@nestjs/common';
import { UsersRepo } from '../users/users.repo';
import { Prisma } from '../../generated/prisma';

@Controller('users')
export class UserController {
  constructor(private readonly usersRepo: UsersRepo) {}

  @Post()
  async createUser(@Body() createUserDto: Prisma.UserCreateInput) {
    return this.usersRepo.createUser(createUserDto);
  }
}
