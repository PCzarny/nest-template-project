import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import type {
  LoginDto,
  LoginResponse,
  LoggedInUser,
} from '../auth/auth.interface';
import { CurrentUser, Public } from '../auth/auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<LoginResponse> {
    return this.authService.signIn(loginDto);
  }

  @Get('profile')
  getProfile(@CurrentUser() user: LoggedInUser) {
    return user;
  }
}
