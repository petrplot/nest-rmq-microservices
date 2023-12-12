import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('x2')
  async mmultiplyNumberX2(@Payload() data: { num: number }) {
    console.log('datax:', data);
    return await this.appService.multiplicationNumber(data);
  }

  @MessagePattern('hi')
  async sayHello(@Payload() data: { name: string }) {
    return await this.appService.sayHallo(data);
  }
}
