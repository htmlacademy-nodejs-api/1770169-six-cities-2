import {injectable} from 'inversify';

import {fileURLToPath} from 'node:url';

import {Logger as LoggerType, pino, transport} from 'pino';

import {Logger} from './logger.interface.js';

@injectable()
export class PinoLogger implements Logger {
  private readonly logger: LoggerType;

  constructor() {
    const destination = fileURLToPath(new URL('../../../../logs/logger.log', import.meta.url));
    const multiTransport = transport({
      targets: [
        {
          target: 'pino/file',
          options: {destination},
          level: 'debug'
        },
        {
          target: 'pino/file',
          options: {},
          level: 'info'
        }
      ]
    });

    this.logger = pino({
      name: 'pino-express',
      level: 'info'
    }, multiTransport);
  }

  public info(message: string, ...args: unknown[]): void {
    this.logger.info(message, args);
  }

  public warn(message: string, ...args: unknown[]): void {
    this.logger.warn(message, args);
  }

  public error(message: string, error: Error, ...args: unknown[]): void {
    this.logger.error(error, message, args);
  }

  public debug(message: string, ...args: unknown[]): void {
    this.logger.debug(message, args);
  }
}
