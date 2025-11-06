import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { UsersRepo } from './users.repo';

@Module({
  imports: [PrismaModule],
  providers: [UsersRepo],
  exports: [UsersRepo],
})
export class UsersModule {}
