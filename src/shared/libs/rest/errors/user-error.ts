import {StatusCodes} from 'http-status-codes';

import {HttpError} from './http-error.js';

export class UserError extends HttpError {
  constructor(httpStatusCode: number = StatusCodes.UNAUTHORIZED, message: string) {
    super(httpStatusCode, message);
  }
}
