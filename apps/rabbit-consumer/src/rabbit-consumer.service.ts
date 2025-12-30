/* eslint-disable @typescript-eslint/require-await */
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class RabbitConsumerService {
  private readonly logger = new Logger(RabbitConsumerService.name);

  async processTask(data: any): Promise<any> {
    this.logger.log(`Processing task: ${JSON.stringify(data)}`);

    // TODO: Implement your task processing logic here
    // Example: process data, save to database, etc.

    return {
      success: true,
      message: 'Task processed successfully',
    };
  }

  async handleTaskCreated(data: any): Promise<string> {
    this.logger.log(`Task created event received: ${JSON.stringify(data)}`);

    return 'Succed';

    // TODO: Implement your event handling logic here
    // This is an event pattern, so it doesn't return a response
  }
}
