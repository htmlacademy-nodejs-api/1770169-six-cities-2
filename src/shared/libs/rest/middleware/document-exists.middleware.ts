import {Request, Response, NextFunction} from 'express';

import {StatusCodes} from 'http-status-codes';

import {Middleware} from './middleware.interface.js';
import {DocumentExists} from '../types/document-exists.interface.js';
import {HttpError} from '../errors/http-error.js';
import {createMessage} from '../../../helpers/index.js';
import {Detail, ErrorMessage} from '../rest.constant.js';

export class DocumentExistsMiddleware implements Middleware {
  private readonly service: DocumentExists;
  private readonly entityName: string;
  private readonly paramName: string;
  private readonly bodyField: string;

  constructor(
    {service, entityName, paramName = '', bodyField = ''}: {service: DocumentExists, entityName: string, paramName?: string, bodyField?: string}
  ) {
    this.service = service;
    this.entityName = entityName;
    this.paramName = paramName;
    this.bodyField = bodyField;
  }

  public async execute({body, params}: Request, _res: Response, next: NextFunction): Promise<void> {
    if (this.paramName) {
      const existsDocument = await this.service.exists(params[this.paramName]);

      if (!existsDocument) {
        throw new HttpError(
          StatusCodes.NOT_FOUND,
          createMessage(ErrorMessage.CITY_NOT_FOUND_MESSAGE, [this.entityName, params[this.paramName]]),
          Detail.DocumentExistsMiddleware
        );
      }
    }

    if (this.bodyField) {
      const existsDocument = await this.service.exists(body[this.bodyField]);

      if (!existsDocument) {
        throw new HttpError(
          StatusCodes.NOT_FOUND,
          createMessage(ErrorMessage.CITY_NOT_FOUND_MESSAGE, [this.entityName, body[this.bodyField]]),
          Detail.DocumentExistsMiddleware
        );
      }
    }

    next();
  }
}
