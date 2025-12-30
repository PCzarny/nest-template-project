import { Module } from '@nestjs/common';
import { RabbitConsumerController } from './rabbit-consumer.controller';
import { RabbitConsumerService } from './rabbit-consumer.service';

@Module({
  imports: [],
  controllers: [RabbitConsumerController],
  providers: [RabbitConsumerService],
})
export class RabbitConsumerModule {}
