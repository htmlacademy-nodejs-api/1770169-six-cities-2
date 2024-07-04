import {IsInt, IsOptional} from 'class-validator';

import {LocationValidationMessage} from './location-validation-message.js';

export class CreateLocationDto {
  @IsOptional()
  @IsInt({message: LocationValidationMessage.latitude.invalidFormat})
  public latitude?: number;

  @IsOptional()
  @IsInt({message: LocationValidationMessage.latitude.invalidFormat})
  public longitude?: number;
}
