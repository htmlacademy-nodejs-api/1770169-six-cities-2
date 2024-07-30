import { City, Type } from '../../types/types';

export class OfferDto {
  public id!: string;
  public title!: string;
  public date!: Date;
  public city!: City;
  public previewImage!: string;
  public isPremium!: boolean;
  public isFavorite!: boolean;
  public rating!: number;
  public type!: Type;
  public price!: number;
  public commentsCount!: number;
}
