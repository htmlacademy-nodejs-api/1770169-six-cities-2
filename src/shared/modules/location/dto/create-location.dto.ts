import {IsLatitude, IsLongitude} from 'class-validator';

import {LocationValidationMessage} from './location-validation-message.js';


export class CreateLocationDto {
  @IsLatitude({message: LocationValidationMessage.latitude.invalidFormat})
  public latitude: number;

  @IsLongitude({message: LocationValidationMessage.longitude.invalidFormat})
  public longitude: number;
}
