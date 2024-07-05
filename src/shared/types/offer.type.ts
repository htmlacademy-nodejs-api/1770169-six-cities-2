
import {City} from './city.type.js';
import {Location} from './location.type.js';
import {Facilities, Housing} from './offer-type.enum.js';
import {User} from './user.type.js';

export type Offer = {
  title: string;
  description: string;
  date: Date;
  city: City;
  previewImage: string;
  images: string[];
  isPremium: boolean;
  isFavorite: boolean;
  type: `${Housing}`;
  bedrooms: number;
  guests: number;
  price: number;
  goods: `${Facilities}`[];
  user: User;
  comments: number;
  location: Location;
}
