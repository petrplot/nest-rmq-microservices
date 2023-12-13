import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MyLoggerService } from './logger/my-logger.service';

async function bootstrap() {
  const logger = new MyLoggerService('logs','bootstrap');
  const app = await NestFactory.create(AppModule);
  const port = 3000;
  await app.listen(port);
  logger.log(`app started on port:${port}`);
}
bootstrap();
