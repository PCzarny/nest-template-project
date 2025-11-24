import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import type { LoginResponse, LoggedInUser } from 'src/auth/auth.interface';
import { LoginDto } from 'src/auth/dto/login.dto';
import { CurrentUser, Public } from 'src/auth/auth.decorator';

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
