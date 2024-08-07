import {DocumentType} from '@typegoose/typegoose';
import {CommentEntity} from './comment.entity.js';
import {CreateCommentDto} from './dto/create-comment.dto.js';

export interface CommentService {
  create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>>;
  find(offerId: string): Promise<DocumentType<CommentEntity>[]>;
  findById(commentId: string): Promise<DocumentType<CommentEntity> | null>;
  deleteById(offerId: string): Promise<number>;
}
