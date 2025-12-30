import { Controller, Post, Body, Get } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from 'apps/nest-template-project/src/auth/auth.service';
import type {
  LoginResponse,
  LoggedInUser,
} from 'apps/nest-template-project/src/auth/auth.interface';
import { LoginDto } from 'apps/nest-template-project/src/auth/dto/login.dto';
import { LoginResponseDto } from 'apps/nest-template-project/src/auth/dto/login-response.dto';
import { LoggedInUserDto } from 'apps/nest-template-project/src/auth/dto/logged-in-user.dto';
import {
  CurrentUser,
  Public,
} from 'apps/nest-template-project/src/auth/auth.decorator';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiResponse({
    status: 200,
    description: 'Login successful, returns JWT access token',
    type: LoginResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials',
  })
  async login(@Body() loginDto: LoginDto): Promise<LoginResponse> {
    return this.authService.signIn(loginDto);
  }

  @Get('profile')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiResponse({
    status: 200,
    description: 'Returns the current authenticated user profile',
    type: LoggedInUserDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized - Invalid or missing JWT token',
  })
  getProfile(@CurrentUser() user: LoggedInUser) {
    return user;
  }
}
