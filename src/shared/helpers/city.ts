import {Separator} from '../constants/index.js';
import {City, CityName} from '../types/index.js';

export const createCity = (cityData: string): City => {
  const [
    cityName,
    cityLatitude,
    cityLongitude,
  ] = cityData.replace(Separator.Line, Separator.Empty).split(Separator.Value);

  return {
    name: cityName as CityName,
    location: {
      latitude: Number.parseFloat(cityLatitude),
      longitude: Number.parseFloat(cityLongitude)
    }
  };
};
