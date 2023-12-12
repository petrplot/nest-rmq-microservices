import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload, Ctx, RmqContext } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('x2')
  async mmultiplyNumberX2(@Payload() data: number, @Ctx() context: RmqContext) {
    console.log( 'context: ', context);
    return await this.appService.multiplicationNumber(data);
  }


  @MessagePattern('hi')
  async sayHello(@Payload() data: string, @Ctx() context: RmqContext) {
    console.log( 'context: ', context);
    return await this.appService.sayHallo(data)
  }
}
