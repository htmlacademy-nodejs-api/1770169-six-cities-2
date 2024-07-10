import {HttpError} from './http-error.js';

export class UserError extends HttpError {
  constructor(httpStatusCode: number, message: string, detail?: string) {
    super(httpStatusCode, message, detail);
  }
}
