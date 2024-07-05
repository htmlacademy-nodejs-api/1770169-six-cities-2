import {Request, Response, NextFunction} from 'express';

import {ClassConstructor, plainToInstance} from 'class-transformer';

import {validate} from 'class-validator';

import {StatusCodes} from 'http-status-codes';

import {Middleware} from './middleware.interface.js';

export class ValidateDtoMiddleware implements Middleware {
  constructor(
    private dto: ClassConstructor<object>
  ) {}

  public async execute({body}: Request, res: Response, next: NextFunction): Promise<void> {
    const errors = await validate(plainToInstance(this.dto, body));

    if (errors.length > 0) {
      res.status(StatusCodes.BAD_REQUEST).send(errors);
      return;
    }

    next();
  }
}
