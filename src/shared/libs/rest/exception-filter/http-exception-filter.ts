import {Request, Response, NextFunction} from 'express';

import {inject, injectable} from 'inversify';

import {ExceptionFilter} from './exception-filter.interface.js';
import {HttpError} from '../errors/http-error.js';
import {Component} from '../../../constants/index.js';
import {Logger} from './../../logger/index.js';
import {createErrorObject} from '../../../helpers/index.js';
import {ErrorType} from '../types/error-type.enum.js';
import {InfoMessage} from '../exception-filter/exception-filter.constant.js';

@injectable()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger
  ) {
    this.logger.info(InfoMessage.REGISTER_HTTP_EXCEPTION_MESSAGE);
  }

  public catch(error: unknown, req: Request, res: Response, next: NextFunction): void {
    if (!(error instanceof HttpError)) {
      return next(error);
    }

    this.logger.error(`[HttpErrorException]: ${req.path} - ${error.message}`, error);
    res
      .status(error.httpStatusCode)
      .json(createErrorObject(ErrorType.CommonError, error.message));
  }
}
