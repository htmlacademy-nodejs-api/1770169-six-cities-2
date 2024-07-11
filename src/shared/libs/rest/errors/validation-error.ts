import {ValidationErrorType} from '../types/validation-error.type.js';
import {HttpError} from './http-error.js';

export class ValidationError extends HttpError {
  public details: ValidationErrorType[] = [];

  constructor(httpStatusCode: number, message: string, details: ValidationErrorType[]) {
    super(httpStatusCode, message);
    this.details = details;
  }
}
