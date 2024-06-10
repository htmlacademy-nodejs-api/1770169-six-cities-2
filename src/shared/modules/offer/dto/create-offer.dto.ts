import {City, Location, User} from '../../../types/index.js';

export class CreateOfferDto {
  public title: string;
  public description: string;
  public date: Date;
  public city: City;
  public previewImage: string;
  public images: string[];
  public isPremium: boolean;
  public isFavorite: boolean;
  public rating: number;
  public type: string;
  public bedrooms: number;
  public maxGuests: number;
  public price: number;
  public goods: string[];
  public host: User;
  public comments: number;
  public location: Location;
}
