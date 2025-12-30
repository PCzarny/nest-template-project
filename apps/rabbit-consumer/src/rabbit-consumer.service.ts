import { Injectable } from '@nestjs/common';

@Injectable()
export class RabbitConsumerService {
  getHello(): string {
    return 'Hello World!';
  }
}
