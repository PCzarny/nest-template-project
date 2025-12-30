import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { Report, ReportSchema } from './report.schema';
import { ReportsRepo } from './reports.repo';
import { ReportsService } from './reports.service';
import { InjectionTokens } from './consts';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Report.name, schema: ReportSchema }]),
    ClientsModule.register([
      {
        name: InjectionTokens.RABBITMQ_SERVICE,
        transport: Transport.RMQ,
        options: {
          urls: [
            process.env.RABBITMQ_URL ?? 'amqp://admin:admin@localhost:5672',
          ],
          queue: process.env.RABBITMQ_QUEUE,
        },
      },
    ]),
  ],
  providers: [ReportsRepo, ReportsService],
  exports: [ReportsRepo, ReportsService],
})
export class ReportsModule {}
