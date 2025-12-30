import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { RabbitConsumerModule } from './../src/rabbit-consumer.module';

describe('RabbitConsumerController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [RabbitConsumerModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should starts', () => {
    // There is no HTTP endpoint exposed—this app is meant to consume messages from RabbitMQ.
    // Here we just assert that the app starts up correctly.
    expect(app).toBeDefined();
  });
});
