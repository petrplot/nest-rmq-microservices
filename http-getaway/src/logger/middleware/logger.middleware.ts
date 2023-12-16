import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { MyLoggerService } from 'src/logger/my-logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor() {}

  private logger = new MyLoggerService('HTTP', 'logs.http');

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, path: url, baseUrl, query } = request;

    const userAgent = request.get('user-agent') || '';

    response.on('close', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');
      if (query.command === 'hi' || query.command === 'x2') {
        statusCode >= 400
          ? this.logger.error(
              `${method} ${baseUrl} ${url} command: ${query.command} ${statusCode}`,
            )
          : this.logger.log(
              `${method} ${baseUrl} ${url} command: ${query.command} ${statusCode} ${contentLength} - ${userAgent} ${ip}`,
            );
      }
    });
    next();
  }
}
