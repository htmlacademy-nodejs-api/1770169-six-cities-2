import {Request, Response, NextFunction} from 'express';

import {ClassConstructor, plainToInstance} from 'class-transformer';

import {validate} from 'class-validator';

import {StatusCodes} from 'http-status-codes';

import {Middleware} from './middleware.interface.js';
import {createMessage, transformValidationError} from '../../../helpers/index.js';
import {ValidationError} from '../errors/index.js';
import {ErrorMessage} from '../rest.constant.js';

export class ValidateDtoMiddleware implements Middleware {
  constructor(
    private dto: ClassConstructor<object>
  ) {}

  public async execute({body, path}: Request, _res: Response, next: NextFunction): Promise<void> {
    const errors = await validate(plainToInstance(this.dto, body));

    if (errors.length > 0) {
      throw new ValidationError(
        StatusCodes.CONFLICT,
        createMessage(ErrorMessage.VALIDATE_ERROR_MESSAGE, [path]),
        transformValidationError(errors),
      );
    }

    next();
  }
}
