import {DocumentType} from '@typegoose/typegoose';
import {CommentEntity} from './comment.entity.js';
import {CreateCommentDto} from './dto/create-comment.dto.js';
import {DocumentExists} from '../../libs/rest/index.js';

export interface CommentService extends DocumentExists {
  create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>>;
  find(offerId: string): Promise<DocumentType<CommentEntity>[]>;
  deleteById(offerId: string): Promise<number>;
}
