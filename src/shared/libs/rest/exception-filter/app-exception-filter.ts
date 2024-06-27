import {Request, Response, NextFunction} from 'express';

import {inject, injectable} from 'inversify';

import {StatusCodes} from 'http-status-codes';

import {ExceptionFilter} from './exception-filter.interface.js';
import {Component} from '../../../constants/index.js';
import {Logger} from '../../logger/index.js';

@injectable()
export class AppExceptionFilter implements ExceptionFilter {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger
  ) {
    this.logger.info('Register AppExceptionFilter');
  }

  public catch(error: Error, _req: Request, res: Response, _next: NextFunction): void {
    this.logger.error(error.message, error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({
        type: 'Ссылка на URI [RFC3986], идентифицирующая тип проблемы. Эта спецификация рекомендует, чтобы при разыменовании она предоставляла удобочитаемую документацию для типа проблемы',
        title: 'Краткая, удобочитаемая сводка по типу проблемы. Он НЕ ДОЛЖЕН меняться от возникновения к возникновению проблемы, за исключением целей локализации',
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        detail: 'Понятное объяснение этой проблемы.',
        instance: 'Ссылка на URI, идентифицирующая конкретное возникновение проблемы. При разыменовании он может давать или не давать дополнительных сведений.',
      });
  }
}
