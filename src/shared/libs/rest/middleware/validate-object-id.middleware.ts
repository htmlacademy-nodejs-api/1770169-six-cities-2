import {Request, Response, NextFunction} from 'express';

import {StatusCodes} from 'http-status-codes';

import {isValidObjectId} from 'mongoose';

import {Middleware} from './middleware.interface.js';
import {HttpError} from '../errors/http-error.js';
import {createMessage} from '../../../helpers/index.js';
import {Detail, ErrorMessage} from '../rest.constant.js';

export class ValidateOjectIdMiddleware implements Middleware {
  constructor(
    private params: string
  ) {}

  public execute({params}: Request, _res: Response, next: NextFunction): void {
    if(!isValidObjectId(params[this.params])) {
      throw new HttpError(
        StatusCodes.BAD_REQUEST,
        createMessage(ErrorMessage.VALIDATE_OBJECT_ID_MESSAGE, [params[this.params]]),
        Detail.ValidateOjectIdMiddleware
      );
    }

    next();
  }
}
