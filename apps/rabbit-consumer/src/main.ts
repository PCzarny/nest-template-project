import { NestFactory } from '@nestjs/core';
import { RabbitConsumerModule } from './rabbit-consumer.module';

async function bootstrap() {
  const app = await NestFactory.create(RabbitConsumerModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
