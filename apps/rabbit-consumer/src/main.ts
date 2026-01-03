import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { ConsoleLogger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { RabbitConsumerModule } from './rabbit-consumer.module';

async function bootstrap() {
  const logger = new ConsoleLogger('RabbitConsumer', { json: true });

  // Create hybrid application: HTTP server + Microservice
  const app = await NestFactory.create(RabbitConsumerModule, {
    logger,
  });

  // Connect RabbitMQ microservice
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL || 'amqp://admin:admin@localhost:5672'],
      queue: process.env.RABBITMQ_QUEUE || 'default_queue',
      queueOptions: {
        durable: true,
      },
      prefetchCount: 1,
    },
  });

  // Start all microservices
  await app.startAllMicroservices();

  // Start HTTP server for health checks
  const port = process.env.PORT || 3001;
  await app.listen(port);

  logger.log(`RabbitMQ Consumer microservice is listening on port ${port}`);
  logger.log('RabbitMQ Consumer microservice connected');
}
bootstrap();
