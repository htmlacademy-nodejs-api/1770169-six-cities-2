import {Router, Response} from 'express';

import asyncHandler from 'express-async-handler';

import {injectable} from 'inversify';

import {StatusCodes} from 'http-status-codes';

import {Logger} from '../../logger/index.js';
import {Route} from '../types/route.interface.js';
import {Controller} from './controller.interface.js';
import {createMessage} from '../../../helpers/index.js';
import {InfoMessage} from '../rest.constant.js';

@injectable()
export abstract class BaseController implements Controller {
  readonly router: Router;

  constructor(
    protected readonly logger: Logger
  ) {
    this.router = Router();
  }

  get () {
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
    res
      .type('application/json')
      .status(statusCode)
      .json(data);
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
