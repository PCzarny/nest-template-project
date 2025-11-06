import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import { UserController } from './user.controller';
import { AuthController } from './auth.controller';

@Module({
  imports: [UsersModule, AuthModule],
  controllers: [AppController, UserController, AuthController],
  providers: [AppService],
})
export class AppModule {}
