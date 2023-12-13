import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MyLoggerService } from './logger/my-logger.service';

@Controller()
export class AppController {
  private logger = new MyLoggerService('logs', 'AppController');
  constructor(private readonly appService: AppService) {}

  @MessagePattern('x2')
  async mmultiplyNumberX2(@Payload() data: { num: number }) {
    this.logger.log(
      'the mmultiplyNumberX2 method worked, data received:',
      data,
    );
    return await this.appService.multiplicationNumber(data);
  }

  @MessagePattern('hi')
  async sayHello(@Payload() data: { name: string }) {
    this.logger.log('the sayHello method worked, data received:', data);
    return await this.appService.sayHallo(data);
  }
}
