import {Location, OfferFacilities, OfferType} from '../../../types/index.js';

export class UpdateOfferDto {
  public title?: string;
  public description?: string;
  public date?: Date;
  public city?: string;
  public previewImage?: string;
  public images?: string[];
  public isPremium?: boolean;
  public isFavorite?: boolean;
  public type?: OfferType;
  public bedrooms?: number;
  public guests?: number;
  public price?: number;
  public goods?: OfferFacilities[];
  public location?: string | Location;
}
