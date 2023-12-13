import { Injectable, LoggerService } from '@nestjs/common';
import * as fs from 'node:fs';
import * as util from 'node:util';
import * as path from 'node:path';

@Injectable()
export class MyLoggerService implements LoggerService {
  path: string;
  stream: fs.WriteStream;
  regexp: RegExp;
  context: string;

  constructor(logPath: string, context: string) {
    fs.mkdir('logs', { recursive: true }, (err) => {
      if (err) throw err;
    });
    this.path = logPath;
    const date = new Date().toISOString().substring(0, 10);
    const filePath = path.join(logPath, `${date}.log`);
    this.stream = fs.createWriteStream(filePath, { flags: 'a' });
    this.regexp = new RegExp(path.dirname(this.path), 'g');
    this.context = context;
  }
  private COLORS = {
    info: '\x1b[1;36;46m',
    debug: '\x1b[1;33m',
    error: '\x1b[1;31;41m',
    system: '\x1b[1;34m',
    access: '\x1b[1;32;42m',
    warn: '\x1b[1;33;43m',
  };
  private DATETIME_LENGTH = 19;

  close() {
    return new Promise((resolve) => this.stream.end(resolve));
  }

  write(type = 'info', s) {
    const now = new Date().toISOString();
    const date = now.substring(0, this.DATETIME_LENGTH);
    const color = this.COLORS[type];
    const line = `[${this.context}]` + '\t' + date + '\t' + s;
    console.log(color + line + '\x1b[0m');
    const out = line.replace(/[\n\r]\s*/g, '; ') + '\n';
    this.stream.write(out);
  }

  log(...args) {
    const msg = util.format(...args);
    this.write('info', msg);
  }

  dir(...args) {
    const msg = util.inspect([...args]);
    this.write('info', msg);
  }

  debug(...args) {
    const msg = util.format(...args);
    this.write('debug', msg);
  }

  error(...args) {
    console.log(...args);
    const msg = util.format(...args);
    this.write('error', msg);
  }

  system(...args) {
    const msg = util.format(...args);
    this.write('system', msg);
  }

  success(...args) {
    const msg = util.format(...args);
    this.write('access', msg);
  }

  warn(...args) {
    const msg = util.format(...args);
    this.write('warn', msg);
  }
}
