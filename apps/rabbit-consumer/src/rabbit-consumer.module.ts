import { Module } from '@nestjs/common';
import { RabbitConsumerController } from './rabbit-consumer.controller';
import { RabbitConsumerService } from './rabbit-consumer.service';
import { HealthController } from './health.controller';

@Module({
  imports: [],
  controllers: [RabbitConsumerController, HealthController],
  providers: [RabbitConsumerService],
})
export class RabbitConsumerModule {}
