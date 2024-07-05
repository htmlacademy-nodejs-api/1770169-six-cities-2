import {defaultClasses, prop, getModelForClass, Ref, modelOptions} from '@typegoose/typegoose';

import {LocationEntity} from '../location/index.js';
import {COLLECTION_NAME} from './city.constant.js';
import {OfferCity} from '../../types/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface CityEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: COLLECTION_NAME,
    timestamps: true,
  }
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class CityEntity extends defaultClasses.TimeStamps {
  @prop({required: true})
  public name: OfferCity;

  @prop({required: true, ref: LocationEntity})
  public location: Ref<LocationEntity>;
}

export const CityModel = getModelForClass(CityEntity);
