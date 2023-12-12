import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async multiplicationNumber(num: number):Promise<number> {
    try {
        return new Promise((resolve, reject) => {
        setTimeout(() => {
          const res = num*2
          resolve(res);
        }, 5000)
        });
    } catch (e) {
      console.log(e);
      
    }
    
  }

  async sayHallo(name : string){
    try {
      return new Promise<string>((resolve, reject) => {
      resolve('hello '+ name)
      })
    } catch (e) {
      console.log(e);
      
    }
    
  }
}
