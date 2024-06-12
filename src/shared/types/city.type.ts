import {OfferCity} from './city-type.enum.js';
import {Location} from './location.type.js';

export type CityName = `${OfferCity}`;

export type City = {
  name: CityName;
  location: Location;
}
