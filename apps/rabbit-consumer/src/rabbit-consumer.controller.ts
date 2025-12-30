import { Controller } from '@nestjs/common';
import { Payload, EventPattern } from '@nestjs/microservices';
import { RabbitConsumerService } from './rabbit-consumer.service';

@Controller()
export class RabbitConsumerController {
  constructor(private readonly rabbitConsumerService: RabbitConsumerService) {}

  // TODO: Add payoad validation
  // TODO: Use context for distributed tracing
  // @MessagePattern('process_task')
  // async handleTask(@Payload() data: any) {
  //   return this.rabbitConsumerService.processTask(data);
  // }

  @EventPattern('task_created')
  async handleTaskCreated(@Payload() data: any) {
    await this.rabbitConsumerService.handleTaskCreated(data);
  }
}
