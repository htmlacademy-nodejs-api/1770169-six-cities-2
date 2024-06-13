import {CityName} from './city.type.js';

export type MockServerDataType = {
  titles: string[];
  descriptions: string[];
  cities: CityName[];
  images: string[];
  types: string[];
  goods: string[];
  names: string[];
  avatars: string[];
  coordinates: {
    [Name in CityName]: [number, number][]
  };
}
