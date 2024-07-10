import {inject, injectable} from 'inversify';

import {BaseController, HttpMethod} from './../../libs/rest/index.js';
import {Component} from '../../constants/index.js';
import {Logger} from '../../libs/logger/index.js';

@injectable()
export class AuthController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger
  ) {
    super(logger);
    this.addRoute({path: '/sign-in', method: HttpMethod.Post, handler: this.login});
    this.addRoute({path: '/sign-in', method: HttpMethod.Get, handler: this.check});
    this.addRoute({path: '/sign-out', method: HttpMethod.Post, handler: this.logout});
  }

  public async login() {}
  public async check() {}
  public async logout() {}
}
