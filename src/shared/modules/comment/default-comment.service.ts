import {inject, injectable} from 'inversify';

import {DocumentType, types} from '@typegoose/typegoose';

import {Component, Sort} from '../../constants/index.js';
import {Logger} from '../../libs/logger/index.js';
import {CommentEntity} from './comment.entity.js';
import {CommentService} from './comment-service.interface.js';
import {InfoMessage, MAX_COMMENT_VIEW} from './comment.constant.js';
import {CreateCommentDto} from './dto/create-comment.dto.js';

@injectable()
export class DefaultCommentService implements CommentService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>
  ) {}

  async create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const result = await this.commentModel.create(dto);
    this.logger.info(InfoMessage.CREATE_COMMENT_MESSAGE);

    return result;
  }

  async find(offerId: string): Promise<DocumentType<CommentEntity>[]> {
    return await this.commentModel
      .find({offerId})
      .populate('userId')
      .limit(MAX_COMMENT_VIEW)
      .sort({createdAt: Sort.DOWN})
      .exec();
  }
}
