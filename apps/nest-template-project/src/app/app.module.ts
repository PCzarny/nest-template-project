import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from 'apps/nest-template-project/src/users/users.module';
import { AuthModule } from 'apps/nest-template-project/src/auth/auth.module';
import { ReportsModule } from 'apps/nest-template-project/src/reports/reports.module';
import { UserController } from './user.controller';
import { AuthController } from './auth.controller';
import { ReportController } from './report.controller';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGO_URI ?? 'mongodb://localhost:27017/nest-template',
    ),
    UsersModule,
    AuthModule,
    ReportsModule,
  ],
  controllers: [
    AppController,
    UserController,
    AuthController,
    ReportController,
  ],
  providers: [AppService],
})
export class AppModule {}
