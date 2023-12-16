import {
  Body,
  Controller,
  HttpCode,
  Inject,
  Post,
  Query,
} from '@nestjs/common';
import { ClientProxy, RmqRecordBuilder } from '@nestjs/microservices';
import { MyLoggerService } from './logger';
import { DataDTO } from './types';

@Controller('api')
export class AppController {
  private logger = new MyLoggerService('AppController');
  constructor(@Inject('MATH_SERVICE') private client: ClientProxy) {}

  @Post('/call')
  @HttpCode(200)
  async call(@Query('command') cmd: string, @Body() data: DataDTO) {
    try {
      this.logger.log(`data:${JSON.stringify(data)}`);
      this.logger.log(`cmd: ${cmd}`);
      if (cmd === 'hi' && !data.name) {
        throw Error('the data must contain the "name" field');
      }
      if (cmd === 'x2' && !data.num) {
        throw Error('the data must contain the "num" field');
      }
      if (cmd === 'hi') {
        const record = new RmqRecordBuilder(data.name).build();
        return this.client.send<DataDTO>(cmd, record);
      }
      if (cmd === 'x2') {
        const record = new RmqRecordBuilder(data.num).build();
        return this.client.send<DataDTO>(cmd, record);
      } else {
        throw Error(
          `incorrect command, it must be "hi" or "x2" current cmd:${cmd}`,
        );
      }
    } catch (error) {
      this.logger.error(error.message);
    }
  }
}
