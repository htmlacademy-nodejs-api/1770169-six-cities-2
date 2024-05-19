import {CITY} from '../constants/common.constant.js';

export type CityName = keyof typeof CITY;

export type CityLocation = typeof CITY[CityName];

export type City = {
  name: CityName;
  location: CityLocation;
}
