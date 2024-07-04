import {IsEnum, IsMongoId} from 'class-validator';

import {OfferCity} from '../../../types/index.js';
import {CityValidationMessage} from './city-validation-message.js';

export class CreateCityDto {
  @IsEnum(OfferCity, {message: CityValidationMessage.name.invalid})
  public name: OfferCity;

  @IsMongoId({message: CityValidationMessage.location.invalidId})
  public location: string;
}
