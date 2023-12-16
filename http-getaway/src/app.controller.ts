import {
  Body,
  Controller,
  HttpCode,
  Inject,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RmqRecordBuilder } from '@nestjs/microservices';
import { MyLoggerService } from './logger/my-logger.service';

@Controller('api')
export class AppController {
  private logger = new MyLoggerService('AppController');
  constructor(@Inject('MATH_SERVICE') private client: ClientProxy) {}

  @Post('/call')
  @HttpCode(200)
  call(
    @Query('command') cmd: string,
    @Body() data: { num: number } | { name: string },
  ) {
    this.logger.log(`data:${JSON.stringify(data)}`);
    this.logger.log(`cmd:, ${cmd}`);
    const record = new RmqRecordBuilder(data).build();
    const res = this.client.send<number | string>(cmd, record);
    return res;
  }
}
