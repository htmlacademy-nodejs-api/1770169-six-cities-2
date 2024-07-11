import {StatusCodes} from 'http-status-codes';

import {ValidationErrorType} from '../types/validation-error.type.js';
import {HttpError} from './http-error.js';

export class ValidationError extends HttpError {
  public details: ValidationErrorType[] = [];

  constructor(httpStatusCode: number = StatusCodes.BAD_REQUEST, message: string, details: ValidationErrorType[]) {
    super(httpStatusCode, message);
    this.details = details;
  }
}
