import {Facilities, Housing} from '../constants/common.constant.js';
import {City} from './city.type.js';
import {Location} from './location.type.js';
import {User} from './user.type.js';

export type OfferType = keyof typeof Housing;
export type OfferFacilities = keyof typeof Facilities;

export type Offer = {
  title: string;
  description: string;
  date: Date;
  city: City;
  previewImage: string;
  images: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  type: OfferType;
  bedrooms: number;
  maxGuests: number;
  price: number;
  goods: OfferFacilities[];
  host: User;
  comments: number;
  location: Location;
}
