import {Logger} from './logger.interface.js';
import {Logger as LoggerType, pino} from 'pino';

export class PinoLogger implements Logger {
  private readonly logger: LoggerType;

  constructor() {
    this.logger = pino();
  }

  info(message: string, ...args: unknown[]): void {
    this.logger.info(message, args);
  }

  warn(message: string, ...args: unknown[]): void {
    this.logger.warn(message, args);
  }

  error(message: string, error: Error, ...args: unknown[]): void {
    this.logger.error(error, message, args);
  }

  debug(message: string, ...args: unknown[]): void {
    this.logger.debug(message, args);
  }
}
