import { Controller, Get } from '@nestjs/common';
import { RabbitConsumerService } from './rabbit-consumer.service';

@Controller()
export class RabbitConsumerController {
  constructor(private readonly rabbitConsumerService: RabbitConsumerService) {}

  @Get()
  getHello(): string {
    return this.rabbitConsumerService.getHello();
  }
}
