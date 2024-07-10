import {Response} from 'express';

import {inject, injectable} from 'inversify';

import {
  BaseController,
  DocumentExistsMiddleware,
  HttpMethod,
  PrivateRouteMiddleware,
  ValidateDtoMiddleware,
  ValidateOjectIdMiddleware
} from '../../libs/rest/index.js';
import {Component} from '../../constants/index.js';
import {Logger} from '../../libs/logger/index.js';
import {CommentService} from './comment-service.interface.js';
import {fillDto} from '../../helpers/index.js';
import {CommentRdo} from './rdo/comment.rdo.js';
import {CommentRequest} from './types/comment-request.type.js';
import {InfoMessage} from './comment.constant.js';
import {CreateCommentDto} from './dto/create-comment.dto.js';
import {OfferService} from '../offer/index.js';

@injectable()
export class CommentController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.CommentService) private readonly commentService: CommentService,
    @inject(Component.OfferService) private readonly offerService: OfferService,
  ) {
    super(logger);

    this.logger.info(InfoMessage.REGISTER_ROUTES_MESSAGE);
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.index,
      middlewares: [
        new ValidateOjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware({
          service: this.offerService,
          entityName: 'Offer',
          paramName: 'offerId',
        })
      ]});
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateOjectIdMiddleware('offerId'),
        new ValidateDtoMiddleware(CreateCommentDto),
        new DocumentExistsMiddleware({
          service: this.offerService,
          entityName: 'Offer',
          paramName: 'offerId',
        })
      ]
    });
  }

  public async index({params}: CommentRequest, res: Response): Promise<void> {
    const comments = await this.commentService.find(params.offerId);
    this.ok(res, fillDto(CommentRdo, comments));
  }

  public async create({body, params, locals}: CommentRequest, res: Response): Promise<void> {
    const comment = await this.commentService.create({...body, offer: params.offerId, user: locals.id});
    this.created(res, fillDto(CommentRdo, comment));
  }
}
