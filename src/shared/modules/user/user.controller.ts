import {NextFunction, Request, Response} from 'express';

import {inject, injectable} from 'inversify';

import {StatusCodes} from 'http-status-codes';

import {
  BaseController,
  DocumentExistsMiddleware,
  HttpMethod,
  HttpError,
  UploadFileMiddleware
} from '../../libs/rest/index.js';
import {Component} from './../../constants/index.js';
import {Logger} from '../../libs/logger/index.js';
import {UserService} from './user-service.interface.js';
import {AuthUserRequest, UserRequest} from './types/user-request.type.js';
import {Config, RestSchema} from '../../libs/config/index.js';
import {createMessage, fillDto} from '../../helpers/index.js';
import {UserRdo} from './rdo/user-rdo.js';
import {DETAIL, ErrorMessage, InfoMessage, Route} from './user.constant.js';
import {UploadAvatarRdo} from './rdo/upload-avatar-rdo.js';
import {AuthService} from '../auth/index.js';
import {AuthorizedUserRdo} from '../auth/rdo/authorized-user.rdo.js';

@injectable()
export class UserController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.Config) protected readonly config: Config<RestSchema>,
    @inject(Component.UserService) private readonly userService: UserService,
    @inject(Component.AuthService) private readonly authService: AuthService,
  ) {
    super(logger);

    this.logger.info(InfoMessage.REGISTER_ROUTES_MESSAGE);
    this.addRoute({path: Route.Registration, method: HttpMethod.Post, handler: this.create});
    this.addRoute({path: Route.Authentication, method: HttpMethod.Post, handler: this.login});
    this.addRoute({path: Route.Authentication, method: HttpMethod.Get, handler: this.check});
    this.addRoute({
      path: Route.Upload,
      method: HttpMethod.Post,
      handler: this.upload,
      middlewares: [
        new DocumentExistsMiddleware({service: this.userService, entityName: 'User', paramName: 'userId'}),
        new UploadFileMiddleware(config.get('UPLOAD_DIRECTORY'), 'avatar')
      ]
    });
  }

  public async create({body}: UserRequest, res: Response, _next: NextFunction): Promise<void> {
    const existsUser = await this.userService.findByEmail(body.email);

    if (existsUser) {
      throw new HttpError(
        StatusCodes.CONFLICT,
        createMessage(ErrorMessage.CREATE_USER_MESSAGE, [body.email]),
        DETAIL
      );
    }
    const user = await this.userService.create(body, this.config.get('SALT'));
    this.created(res, fillDto(UserRdo, user));
  }

  public async login({body}: AuthUserRequest, res: Response, _next: NextFunction): Promise<void> {
    const user = await this.authService.verify(body);
    const token = await this.authService.authenticate(user);

    this.ok(res, {
      token,
      email: user.email
    });
  }

  public async check({locals}: Request, res: Response, _next: NextFunction): Promise<void> {
    const user = await this.userService.findById(locals.id);

    if (!user) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        ErrorMessage.UNAUTHORIZED_MESSAGE
      );
    }

    this.ok(res, fillDto(AuthorizedUserRdo, user));
  }

  public async upload({params, file}: UserRequest, res: Response, _next: NextFunction): Promise<void> {
    const user = await this.userService.uploadAvatar(params.userId, {avatar: file?.filename});
    this.created(res, fillDto(UploadAvatarRdo, user));
  }
}
