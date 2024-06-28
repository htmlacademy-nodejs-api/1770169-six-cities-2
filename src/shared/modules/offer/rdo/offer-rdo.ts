import {Expose, Type} from 'class-transformer';

import {CityRdo} from '../../city/index.js';

export class OfferRdo {
  @Expose()
  public id: string;

  @Expose()
  public title: string;

  @Expose()
  public date: Date;

  @Expose()
  @Type(() => CityRdo)
  public city: CityRdo;

  @Expose()
  public previewImage: string;

  @Expose()
  public isPremium: boolean;

  @Expose()
  public isFavorite: boolean;

  @Expose()
  public rating: number;

  @Expose()
  public type: string;

  @Expose()
  public price: number;

  @Expose()
  public commentsCount: number;
}
