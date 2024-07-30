import { Type, Location, City } from '../../types/types';

export class CreateOfferDto {
  public title!: string;
  public description!: string;
  public date!: string;
  public city!: City;
  public previewImage!: string;
  public images!: string[];
  public isPremium!: boolean;
  public isFavorite!: boolean;
  public type!: Type;
  public bedrooms!: number;
  public guests!: number;
  public price!: number;
  public goods!: string[];
  public location!: Location;
}
