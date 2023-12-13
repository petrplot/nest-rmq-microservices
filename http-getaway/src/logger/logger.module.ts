import { Module } from '@nestjs/common';
import { MyLoggerService } from './my-logger.service';

@Module({
  controllers: [],
  providers: [MyLoggerService],
})
export class LoggerModule {}
