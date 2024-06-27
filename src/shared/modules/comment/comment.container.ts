import {Container} from 'inversify';

import {types} from '@typegoose/typegoose';

import {Component} from '../../constants/index.js';
import {CommentEntity, CommentModel} from './comment.entity.js';
import {CommentService} from './comment-service.interface.js';
import {DefaultCommentService} from './default-comment.service.js';
import {CommentController} from './comment.controller.js';

export function createCommentContainer() {
  const container = new Container();
  container.bind<types.ModelType<CommentEntity>>(Component.CommentModel).toConstantValue(CommentModel);
  container.bind<CommentService>(Component.CommentService).to(DefaultCommentService).inTransientScope();
  container.bind<CommentController>(Component.CommentController).to(CommentController).inTransientScope();

  return container;
}
