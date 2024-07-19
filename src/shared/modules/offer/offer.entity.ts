import {Ref, defaultClasses, getModelForClass, modelOptions, prop} from '@typegoose/typegoose';

import {Facilities, Housing} from '../../types/index.js';
import {UserEntity} from '../user/index.js';
import {COLLECTION_NAME} from './offer.constant.js';
import {CityEntity} from '../city/index.js';
import {LocationEntity} from '../location/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: COLLECTION_NAME,
    timestamps: true,
  }
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({trim: true, required: true})
  public title: string;

  @prop({trim: true, required: true})
  public description: string;

  @prop({required: true})
  public date: Date;

  @prop({required: true, ref: CityEntity})
  public city!: Ref<CityEntity>;

  @prop({required: true})
  public previewImage: string;

  @prop({required: true})
  public images: string[];

  @prop({required: true})
  public isPremium: boolean;

  @prop({required: true})
  public isFavorite: boolean;

  @prop({required: true})
  public type: `${Housing}`;

  @prop({required: true})
  public bedrooms: number;

  @prop({required: true})
  public guests: number;

  @prop({required: true})
  public price: number;

  @prop({required: true})
  public goods: `${Facilities}`[];

  @prop({required: true, ref: UserEntity})
  public user!: Ref<UserEntity>;

  @prop({required: true, ref: LocationEntity})
  public location!: Ref<LocationEntity>;
}

export const OfferModel = getModelForClass(OfferEntity);
