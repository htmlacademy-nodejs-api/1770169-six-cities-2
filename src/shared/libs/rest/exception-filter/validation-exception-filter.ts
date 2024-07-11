import {Request, Response, NextFunction} from 'express';

import {inject, injectable} from 'inversify';

import {ExceptionFilter} from './exception-filter.interface.js';
import {ValidationError} from '../errors/index.js';
import {Component} from '../../../constants/index.js';
import {Logger} from './../../logger/index.js';
import {createErrorObject} from '../../../helpers/index.js';
import {ErrorType} from '../types/error-type.enum.js';
import {InfoMessage} from '../exception-filter/exception-filter.constant.js';

@injectable()
export class ValidationExceptionFilter implements ExceptionFilter {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger
  ) {
    this.logger.info(InfoMessage.REGISTER_VALIDATION_EXCEPTION_MESSAGE);
  }

  public catch(error: unknown, _req: Request, res: Response, next: NextFunction): void {
    if (!(error instanceof ValidationError)) {
      return next(error);
    }

    this.logger.error(`[ValidationErrorException]: ${error.message}`, error);
    error.details.forEach(
      (errorDetail) => this.logger.warn(`[${errorDetail.property}] — ${errorDetail.messages}`)
    );
    res
      .status(error.httpStatusCode)
      .json(createErrorObject(ErrorType.ValidationError, error.message, error.details));
  }
}
