import {
  Body,
  Controller,
  HttpCode,
  Inject,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RmqRecordBuilder } from '@nestjs/microservices';

@Controller('api')
export class AppController {
  constructor(@Inject('MATH_SERVICE') private client: ClientProxy) {}

  @Post('/call')
  @HttpCode(200)
  call(@Query('command') cmd: string, @Body() data: number | string) {
    console.log('data:', data);
    console.log('cmd:', cmd);
    const record = new RmqRecordBuilder(data).build();
    return this.client.send<number | string>(cmd, record);
  }
}
