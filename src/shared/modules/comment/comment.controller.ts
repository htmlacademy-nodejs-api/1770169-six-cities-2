import {Response} from 'express';

import {inject, injectable} from 'inversify';

import {BaseController, HttpMethod} from '../../libs/rest/index.js';
import {Component} from '../../constants/index.js';
import {Logger} from '../../libs/logger/index.js';
import {CommentService} from './comment-service.interface.js';
import {fillDto} from '../../helpers/index.js';
import {CommentRdo} from './rdo/comment.rdo.js';
import {CommentRequest} from './types/comment-request.type.js';

@injectable()
export class CommentController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.CommentService) private readonly commentService: CommentService
  ) {
    super(logger);

    this.logger.info('Register routes for CommentController...');
    this.addRoute({path: '/:offerId', method: HttpMethod.Get, handler: this.findComments});
    this.addRoute({path: '/:offerId', method: HttpMethod.Post, handler: this.createComments});
  }

  public async findComments({params}: CommentRequest, res: Response): Promise<void> {
    const comments = await this.commentService.find(params.offerId);
    this.ok(res, fillDto(CommentRdo, comments));
  }

  public async createComments({body, params}: CommentRequest, res: Response): Promise<void> {
    const comment = await this.commentService.create({...body, offer: params.offerId, user: ''});
    this.created(res, fillDto(CommentRdo, comment));
  }
}
