import {Ref, defaultClasses, getModelForClass, modelOptions, prop} from '@typegoose/typegoose';
import {OfferFacilities, OfferType, Location, City} from '../../types/index.js';
import {Facilities, Housing} from '../../constants/common.constant.js';
import {UserEntity} from '../user/index.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers',
    timestamps: true,
  }
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({trim: true, required: true, min: 10, max: 100})
  public title: string;

  @prop({trim: true, required: true, min: 20, max: 1024})
  public description: string;

  @prop({required: true})
  public date: Date;

  @prop({required: true})
  public city: City;

  @prop({required: true})
  public previewImage: string;

  @prop({required: true, dim: 6})
  public images: string[];

  @prop({required: true})
  public isPremium: boolean;

  @prop({required: true})
  public isFavorite: boolean;

  @prop({required: true, min: 1, max: 5})
  public rating: number;

  @prop({required: true, enum: Housing})
  public type: OfferType;

  @prop({required: true, min: 1, max: 8})
  public bedrooms: number;

  @prop({required: true, min: 1, max: 10})
  public maxGuests: number;

  @prop({required: true, min: 100, max: 100000})
  public price: number;

  @prop({required: true, enum: Facilities})
  public goods: OfferFacilities[];

  @prop({required: true, ref: UserEntity})
  public host: Ref<UserEntity>;

  @prop({required: true})
  public comments: number;

  @prop({required: true})
  public location: Location;
}

export const OfferModel = getModelForClass(OfferEntity);
