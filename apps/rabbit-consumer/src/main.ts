import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { ConsoleLogger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { RabbitConsumerModule } from './rabbit-consumer.module';

async function bootstrap() {
  const logger = new ConsoleLogger('RabbitConsumer', { json: true });

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    RabbitConsumerModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL || 'amqp://admin:admin@localhost:5672'],
        queue: process.env.RABBITMQ_QUEUE || 'default_queue',
        queueOptions: {
          durable: true,
        },
        prefetchCount: 1,
      },
      logger,
    },
  );

  await app.listen();
  logger.log('RabbitMQ Consumer microservice is listening');
}
bootstrap();
