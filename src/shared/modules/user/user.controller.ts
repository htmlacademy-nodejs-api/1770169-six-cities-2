import {NextFunction, Request, Response} from 'express';

import {inject, injectable} from 'inversify';

import {BaseController, HttpMethod} from '../../libs/rest/index.js';
import {Component} from './../../constants/index.js';
import {Logger} from '../../libs/logger/index.js';
import {UserService} from './user-service.interface.js';
import {AuthUserRequest, UserRequest} from './types/user-request.type.js';
import {Config, RestSchema} from '../../libs/config/index.js';
import {createSHA256, fillDto} from '../../helpers/index.js';
import {UserRdo} from './rdo/user-rdo.js';

@injectable()
export class UserController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.Config) protected readonly config: Config<RestSchema>,
    @inject(Component.UserService) private readonly userService: UserService,
  ) {
    super(logger);
    this.addRoute({path: '/sign-up', method: HttpMethod.Post, handler: this.createUser});
    this.addRoute({path: '/sign-in', method: HttpMethod.Post, handler: this.loginUser});
    this.addRoute({path: '/sign-in', method: HttpMethod.Get, handler: this.checkUserStatus});
    this.addRoute({path: '/sign-out', method: HttpMethod.Post, handler: this.logoutUser});
  }

  public async createUser({body}: UserRequest, res: Response, _next: NextFunction): Promise<void> {
    const user = await this.userService.create(body, this.config.get('SALT'));
    this.ok(res, fillDto(UserRdo, user));
  }

  public async loginUser({body}: AuthUserRequest, res: Response, _next: NextFunction): Promise<void> {
    const user = await this.userService.findByEmail(body.email);

    if (!user) {
      throw new Error();
    }

    if (user.getPassword() === createSHA256(body.password, this.config.get('SALT'))) {
      this.ok(res, {token: 'T2VyLm5lckBnbWFpbC5jb20'});
    }
  }

  public async checkUserStatus(_req: Request, _res: Response, _next: NextFunction): Promise<void> {}

  public async logoutUser(_req: Request, _res: Response, _next: NextFunction): Promise<void> {}
}
