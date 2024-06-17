
import {City} from './city.type.js';
import {Location} from './location.type.js';
import {Facilities, Housing} from './offer-type.enum.js';
import {User} from './user.type.js';

export type OfferType = `${Housing}`;
export type OfferFacilities = `${Facilities}`;

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
  user: User;
  comments: number;
  location: Location;
}
