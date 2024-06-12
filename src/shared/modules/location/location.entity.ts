import {defaultClasses, prop, getModelForClass, modelOptions} from '@typegoose/typegoose';

import {COLLECTION_NAME} from './location.constant.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface LocationEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: COLLECTION_NAME,
    timestamps: true,
  }
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class LocationEntity extends defaultClasses.TimeStamps {
  @prop({required: true})
  public latitude: number;

  @prop({required: true})
  public longitude: number;
}

export const LocationModel = getModelForClass(LocationEntity);
