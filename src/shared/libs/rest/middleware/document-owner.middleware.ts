import {Request, Response, NextFunction} from 'express';

import {StatusCodes} from 'http-status-codes';

import {Middleware} from './middleware.interface.js';
import {HttpError} from '../errors/http-error.js';
import {createMessage} from '../../../helpers/index.js';
import {Detail, ErrorMessage} from '../rest.constant.js';
import {DocumentOwner} from '../types/document-owner.interface.js';

export class DocumentOwnerMiddleware implements Middleware {
  private readonly service: DocumentOwner;
  private readonly document: string;

  constructor(service: DocumentOwner, document: string) {
    this.service = service;
    this.document = document;

  }

  public async execute({params, locals}: Request, _res: Response, next: NextFunction): Promise<void> {
    const isOwner = await this.service.owner(params.offerId, locals.id);

    if (!isOwner) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        createMessage(ErrorMessage.OWNERSHIP_ERROR_MESSAGE, [this.document]),
        Detail.VerificationOwnershipMiddleware
      );
    }

    next();
  }
}
