import { Test, TestingModule } from '@nestjs/testing';
import { RabbitConsumerController } from './rabbit-consumer.controller';
import { RabbitConsumerService } from './rabbit-consumer.service';

describe('RabbitConsumerController', () => {
  let rabbitConsumerController: RabbitConsumerController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [RabbitConsumerController],
      providers: [RabbitConsumerService],
    }).compile();

    rabbitConsumerController = app.get<RabbitConsumerController>(RabbitConsumerController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(rabbitConsumerController.getHello()).toBe('Hello World!');
    });
  });
});
