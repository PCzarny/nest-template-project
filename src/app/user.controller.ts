import { Controller, Post, Body } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
} from '@nestjs/swagger';
import { UsersRepo } from '../users/users.repo';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UserResponseDto } from '../users/dto/user-response.dto';
import { RequirePermissions, Permission } from 'src/auth/permissions.decorator';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly usersRepo: UsersRepo) {}

  @Post()
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    type: UserResponseDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized - Invalid or missing JWT token',
  })
  @ApiForbiddenResponse({ description: 'Forbidden - Insufficient permissions' })
  @RequirePermissions(Permission.CREATE_USER)
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersRepo.createUser(createUserDto);
  }
}
