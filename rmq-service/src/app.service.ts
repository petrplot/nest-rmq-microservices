import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async multiplicationNumber(data: { num: number }): Promise<number> {
    try {
      return new Promise((resolve) => {
        setTimeout(() => {
          const { num } = data;
          const res = num * 2;
          resolve(res);
        }, 1000);
      });
    } catch (e) {
      console.log(e);
    }
  }

  async sayHallo(data: { name: string }) {
    try {
      const { name } = data;
      return new Promise<string>((resolve) => {
        resolve('hello ' + name);
      });
    } catch (e) {
      console.log(e);
    }
  }
}
