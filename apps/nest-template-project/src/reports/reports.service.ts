import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InjectionTokens } from './consts';
import { ReportsRepo } from './reports.repo';
import { CreateReportDto } from './dto/create-report.dto';
import { TReport } from './reports.interface';

@Injectable()
export class ReportsService {
  private readonly logger = new Logger(ReportsService.name);

  constructor(
    @Inject(InjectionTokens.RABBITMQ_SERVICE) private client: ClientProxy,
    private reportsRepo: ReportsRepo,
  ) {}

  async createReport(data: CreateReportDto): Promise<TReport> {
    this.logger.log(`Creating report: ${JSON.stringify(data)}`);
    const result = this.client.emit('task_created', {
      createdAt: new Date(),
      taskId: 1,
    });
    this.logger.log(`Result: ${JSON.stringify(result)}`);
    return this.reportsRepo.createReport(data);
  }
}
