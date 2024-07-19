import {Router, Response} from 'express';

import asyncHandler from 'express-async-handler';

import {inject, injectable} from 'inversify';

import {StatusCodes} from 'http-status-codes';

import {Logger} from '../../logger/index.js';
import {Route} from '../types/route.interface.js';
import {Controller} from './controller.interface.js';
import {createMessage} from '../../../helpers/index.js';
import {InfoMessage} from '../rest.constant.js';
import {Component} from '../../../constants/index.js';
import {PathTransformer} from '../transform/path-transformer.js';

@injectable()
export abstract class BaseController implements Controller {
  readonly router: Router;
  @inject(Component.PathTransformer) private pathTransformer: PathTransformer;

  constructor(
    protected readonly logger: Logger,
  ) {
    this.router = Router();
  }

  public get() {
    return this.router;
  }

  public addRoute(route: Route): void {
    const handlers = [
      ...(route.middlewares?.map((middleware) => asyncHandler(middleware.execute.bind(middleware))) ?? []),
      asyncHandler(route.handler.bind(this))
    ];
    this.router[route.method](route.path, handlers);
    this.logger.info(createMessage(InfoMessage.ROUTE_REGISTERED_MESSAGE, [route.method.toUpperCase(), route.path]));
  }

  public send<T>(res: Response, statusCode: number, data: T): void {
    const transformedData = this.pathTransformer.execute(data as Record<string, unknown>);
    res
      .type('application/json')
      .status(statusCode)
      .json(transformedData);
  }

  public ok<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.OK, data);
  }

  public created<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.CREATED, data);
  }

  public noContent<T>(res: Response, data: T): void {
    this.send(res, StatusCodes.NO_CONTENT, data);
  }
}
