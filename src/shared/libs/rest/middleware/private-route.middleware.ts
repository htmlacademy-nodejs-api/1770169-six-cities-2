import {Request, Response, NextFunction} from 'express';

import {StatusCodes} from 'http-status-codes';

import {Middleware} from './middleware.interface.js';
import {HttpError} from '../errors/http-error.js';
import {Detail, ErrorMessage} from '../rest.constant.js';


export class PrivateRouteMiddleware implements Middleware {
  execute({locals}: Request, _res: Response, next: NextFunction): void {
    if (!locals) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        ErrorMessage.UNAUTHORIZED_MESSAGE,
        Detail.PrivateRouteMiddleware
      );
    }

    return next();
  }
}
