import {injectable} from 'inversify';

import {fileURLToPath} from 'node:url';

import {Logger as LoggerType, pino, transport} from 'pino';

import {Logger} from './logger.interface.js';
import {DESTINATION_URL, Level, LOGGER_NAME, TRANSPORT_TARGET} from './logger.constant.js';

@injectable()
export class PinoLogger implements Logger {
  private readonly logger: LoggerType;

  constructor() {
    const destination = fileURLToPath(new URL(DESTINATION_URL, import.meta.url));
    const multiTransport = transport({
      targets: [
        {
          target: TRANSPORT_TARGET,
          options: {destination},
          level: Level.Debug
        },
        {
          target: TRANSPORT_TARGET,
          options: {},
          level: Level.Info
        }
      ]
    });

    this.logger = pino({
      name: LOGGER_NAME,
      level: Level.Info
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
