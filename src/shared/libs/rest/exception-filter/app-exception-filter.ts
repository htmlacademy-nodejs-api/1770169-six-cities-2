import {Request, Response, NextFunction} from 'express';

import {inject, injectable} from 'inversify';

import {StatusCodes} from 'http-status-codes';

import {ExceptionFilter} from './exception-filter.interface.js';
import {Component} from '../../../constants/index.js';
import {Logger} from '../../logger/index.js';
import {InfoMessage} from './exception-filter.constant.js';
import {createErrorObject} from '../../../helpers/index.js';
import {ErrorType} from '../types/error-type.enum.js';

@injectable()
export class AppExceptionFilter implements ExceptionFilter {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger
  ) {
    this.logger.info(InfoMessage.REGISTER_APP_EXCEPTION_MESSAGE);
  }

  public catch(error: Error, _req: Request, res: Response, _next: NextFunction): void {
    this.logger.error(error.message, error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(createErrorObject(ErrorType.ServiceError, error.message));
  }
}
