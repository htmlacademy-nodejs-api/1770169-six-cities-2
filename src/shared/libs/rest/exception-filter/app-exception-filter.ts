import {Request, Response, NextFunction} from 'express';

import {inject, injectable} from 'inversify';

import {StatusCodes} from 'http-status-codes';

import {ExceptionFilter} from './exception-filter.interface.js';
import {Component} from '../../../constants/index.js';
import {Logger} from '../../logger/index.js';
import {InfoMessage} from './exception-filter.constant.js';
import {createErrorObject} from '../../../helpers/index.js';
import {HttpError} from '../errors/http-error.js';
import {UserError} from '../errors/user-error.js';
import {ErrorType} from '../rest.constant.js';

@injectable()
export class AppExceptionFilter implements ExceptionFilter {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger
  ) {
    this.logger.info(InfoMessage.REGISTER_EXCEPTION_MESSAGE);
  }

  private handleHttpError(error: HttpError, _req: Request, res: Response, _next: NextFunction) {
    this.logger.error(`[${error.detail}]: ${error.httpStatusCode} — ${error.message}`, error);
    res
      .status(error.httpStatusCode)
      .json(createErrorObject(error.message, ErrorType.Client));
  }

  private handleOtherError(error: Error, _req: Request, res: Response, _next: NextFunction) {
    this.logger.error(error.message, error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(createErrorObject(error.message, ErrorType.Server));
  }

  private handleUserError(error: UserError, _req: Request, res: Response, _next: NextFunction) {
    this.logger.error(`[${error.detail}]: ${error.httpStatusCode} — ${error.message}`, error);
    res
      .status(error.httpStatusCode)
      .json(createErrorObject(error.message, ErrorType.Authorization));
  }

  public catch(error: Error | HttpError | UserError, req: Request, res: Response, next: NextFunction): void {
    switch(true) {
      case error instanceof HttpError:
        this.handleHttpError(error, req, res, next);
        break;
      case error instanceof UserError:
        this.handleUserError(error, req, res, next);
        break;
      default:
        this.handleOtherError(error, req, res, next);
    }
  }
}
