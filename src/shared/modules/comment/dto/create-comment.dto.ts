import {IsDateString, IsInt, IsMongoId, IsString, Max, MaxLength, Min, MinLength} from 'class-validator';

import {Comment, Rating} from '../comment.constant.js';
import {CommentValidationMessage} from './comment-validation-message.js';

export class CreateCommentDto {
  @IsString({message: CommentValidationMessage.comment.invalidFormat})
  @MinLength(Comment.Min, {message: CommentValidationMessage.comment.minLength})
  @MaxLength(Comment.Max, {message: CommentValidationMessage.comment.maxLength})
  public comment: string;

  @IsDateString({}, {message: CommentValidationMessage.date.invalidFormat})
  public date: Date;

  @IsInt({message: CommentValidationMessage.rating.invalidFormat})
  @Min(Rating.Min, {message: CommentValidationMessage.rating.minValue})
  @Max(Rating.Max, {message: CommentValidationMessage.rating.maxValue})
  public rating: number;

  @IsMongoId({message: CommentValidationMessage.offer.invalidId})
  public offer: string;

  @IsMongoId({message: CommentValidationMessage.user.invalidId})
  public user: string;
}
