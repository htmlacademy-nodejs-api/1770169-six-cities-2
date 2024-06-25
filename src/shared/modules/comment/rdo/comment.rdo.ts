import {Expose, Type} from 'class-transformer';

import {UserRdo} from '../../user/index.js';

export class CommentRdo {
  @Expose()
  public id: string;

  @Expose()
  public comment: string;

  @Expose()
  public date: Date;

  @Expose()
  public rating: number;

  @Expose()
  @Type(() => UserRdo)
  public user: UserRdo;
}
