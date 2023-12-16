import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MyLoggerService } from './logger/my-logger.service';

@Injectable()
export class AppService {
  private logger = new MyLoggerService('logs', 'AppService');

  async multiplicationNumber(num: number): Promise<number> {
    try {
      return new Promise((resolve) => {
        setTimeout(() => {
          if (!num) {
            this.logger.error(`num is: ${num}`);
            throw new InternalServerErrorException('num error');
          }
          const res = num * 2;
          resolve(res);
        }, 1000);
      });
    } catch (error) {
      this.logger.error(`some error`, error.stack);
      throw new InternalServerErrorException();
    }
  }

  async sayHallo(name:string) {
    try {
      if (!name) {
        this.logger.error(`num is: ${name}`);
        throw new Error('name error');
      }
      return new Promise<string>((resolve) => {
        resolve('hello ' + name);
      });
    } catch (error) {
      this.logger.error(`some error`, error.stack, error.message);
      throw new InternalServerErrorException();
    }
  }
}
