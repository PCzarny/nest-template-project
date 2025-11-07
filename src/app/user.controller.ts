import { Controller, Post, Body } from '@nestjs/common';
import { UsersRepo } from '../users/users.repo';
import { Prisma } from '../../generated/prisma';
import { RequirePermissions, Permission } from 'src/auth/permissions.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly usersRepo: UsersRepo) {}

  @Post()
  @RequirePermissions(Permission.CREATE_USER)
  async createUser(@Body() createUserDto: Prisma.UserCreateInput) {
    return this.usersRepo.createUser(createUserDto);
  }
}
