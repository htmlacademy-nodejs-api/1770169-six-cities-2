import {Response} from 'express';

import {inject, injectable} from 'inversify';

import {BaseController, HttpMethod, ValidateDtoMiddleware, ValidateOjectIdMiddleware} from '../../libs/rest/index.js';
import {Component} from '../../constants/index.js';
import {Logger} from '../../libs/logger/index.js';
import {CommentService} from './comment-service.interface.js';
import {fillDto} from '../../helpers/index.js';
import {CommentRdo} from './rdo/comment.rdo.js';
import {CommentRequest} from './types/comment-request.type.js';
import {InfoMessage} from './comment.constant.js';
import {CreateCommentDto} from './dto/create-comment.dto.js';

@injectable()
export class CommentController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.CommentService) private readonly commentService: CommentService
  ) {
    super(logger);

    this.logger.info(InfoMessage.REGISTER_ROUTES_MESSAGE);
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.index,
      middlewares: [new ValidateOjectIdMiddleware('offerId')]});
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new ValidateOjectIdMiddleware('offerId'),
        new ValidateDtoMiddleware(CreateCommentDto)
      ]
    });
  }

  public async index({params}: CommentRequest, res: Response): Promise<void> {
    const comments = await this.commentService.find(params.offerId);
    this.ok(res, fillDto(CommentRdo, comments));
  }

  public async create({body, params}: CommentRequest, res: Response): Promise<void> {
    const comment = await this.commentService.create({...body, offer: params.offerId, user: ''});
    this.created(res, fillDto(CommentRdo, comment));
  }
}
