import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { MyLoggerService } from './logger/my-logger.service';

async function bootstrap() {
  const logger = new MyLoggerService('logs', 'bootstrap')
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        //этот url для демонстрации, для работы сервиса добавьте свой url 
        urls: ['amqp://admin:1234@localhost:5672'],
        queue: 'cats_queue',
        queueOptions: {
          durable: false,
        },
      },
    },
  );
  await app.listen();
  logger.log('server is working now')
}
bootstrap();
