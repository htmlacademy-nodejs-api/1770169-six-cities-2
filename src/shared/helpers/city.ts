import {Separator} from '../constants/index.js';
import {City, OfferCity} from '../types/index.js';

export const createCity = (cityData: string): City => {
  const [
    cityName,
    cityLatitude,
    cityLongitude,
  ] = cityData.replace(Separator.Line, Separator.Empty).split(Separator.Value);

  return {
    name: cityName as OfferCity,
    location: {
      latitude: Number.parseFloat(cityLatitude),
      longitude: Number.parseFloat(cityLongitude)
    }
  };
};
