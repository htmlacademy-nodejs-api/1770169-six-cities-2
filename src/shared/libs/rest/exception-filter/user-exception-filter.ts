import {Request, Response, NextFunction} from 'express';

import {inject, injectable} from 'inversify';

import {ExceptionFilter} from './exception-filter.interface.js';
import {UserError} from '../errors/index.js';
import {Component} from '../../../constants/index.js';
import {Logger} from './../../logger/index.js';
import {createErrorObject} from '../../../helpers/index.js';
import {ErrorType} from '../types/error-type.enum.js';
import {InfoMessage} from '../exception-filter/exception-filter.constant.js';

@injectable()
export class UserExceptionFilter implements ExceptionFilter {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger
  ) {
    this.logger.info(InfoMessage.REGISTER_USER_EXCEPTION_MESSAGE);
  }

  public catch(error: unknown, _req: Request, res: Response, next: NextFunction): void {
    if (!(error instanceof UserError)) {
      return next(error);
    }

    this.logger.error(`[UserErrorException]: ${error.message}`, error);
    res
      .status(error.httpStatusCode)
      .json(createErrorObject(ErrorType.CommonError, error.message));
  }
}
