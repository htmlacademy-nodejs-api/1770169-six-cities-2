import {defaultClasses, prop, getModelForClass, Ref, modelOptions} from '@typegoose/typegoose';

import {CityName} from '../../types/index.js';
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
  @prop({required: true, type: () => String, enum: OfferCity})
  public name: CityName;

  @prop({required: true, ref: LocationEntity})
  public locationId: Ref<LocationEntity>;
}

export const CityModel = getModelForClass(CityEntity);
