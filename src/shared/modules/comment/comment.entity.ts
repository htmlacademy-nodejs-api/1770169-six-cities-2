import {defaultClasses, getModelForClass, modelOptions, prop, Ref} from '@typegoose/typegoose';

import {UserEntity} from '../user/index.js';
import {COLLECTION_NAME} from './comment.constant.js';
import {OfferEntity} from '../offer/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface CommentEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: COLLECTION_NAME,
    timestamps: true
  }
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class CommentEntity extends defaultClasses.TimeStamps {
  @prop({required: true, trim: true})
  public comment: string;

  @prop({required: true})
  public date: Date;

  @prop({required: true})
  public rating: number;

  @prop({required: true, ref: OfferEntity})
  public offer: Ref<OfferEntity>;

  @prop({required: true, ref: UserEntity})
  public user: Ref<UserEntity>;
}

export const CommentModel = getModelForClass(CommentEntity);
