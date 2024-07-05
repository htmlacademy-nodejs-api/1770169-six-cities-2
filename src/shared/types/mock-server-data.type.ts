import {OfferCity} from './index.js';

export type MockServerDataType = {
  titles: string[];
  descriptions: string[];
  cities: OfferCity[];
  images: string[];
  types: string[];
  goods: string[];
  names: string[];
  avatars: string[];
  coordinates: {
    [Name in OfferCity]: [number, number][]
  };
}
