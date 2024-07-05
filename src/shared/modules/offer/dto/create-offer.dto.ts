import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsObject,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength
} from 'class-validator';

import {Facilities, Housing, Location, OfferCity} from '../../../types/index.js';
import {OfferValidationMessage} from './offer-validation-message.js';
import {Bedroom, Description, GOODS_MIN_SIZE, Guest, IMAGES_SIZE, Price, Title} from '../offer.constant.js';

export class CreateOfferDto {
  @IsString({message: OfferValidationMessage.title.invalidFormat})
  @MinLength(Title.Min, {message: OfferValidationMessage.title.minLength})
  @MaxLength(Title.Max, {message: OfferValidationMessage.title.maxLength})
  public title: string;

  @IsString({message: OfferValidationMessage.description.invalidFormat})
  @MinLength(Description.Min, {message: OfferValidationMessage.description.minLength})
  @MaxLength(Description.Max, {message: OfferValidationMessage.description.maxLength})
  public description: string;

  @IsDateString({}, {message: OfferValidationMessage.date.invalidFormat})
  public date: Date;

  @IsEnum(OfferCity, {message: OfferValidationMessage.city.invalid})
  public city: OfferCity;

  @IsString({message: OfferValidationMessage.previewImage.invalidFormat})
  public previewImage: string;

  @IsArray({message: OfferValidationMessage.images.invalidFormat})
  @ArrayMinSize(IMAGES_SIZE, {message: OfferValidationMessage.images.size})
  @ArrayMaxSize(IMAGES_SIZE, {message: OfferValidationMessage.images.size})
  public images: string[];

  @IsBoolean({message: OfferValidationMessage.isPremium.invalidFormat})
  public isPremium: boolean;

  @IsBoolean({message: OfferValidationMessage.isFavorite.invalidFormat})
  public isFavorite: boolean;

  @IsEnum(Housing, {each: true, message: OfferValidationMessage.type.invalid})
  public type: `${Housing}`;

  @IsInt({message: OfferValidationMessage.bedrooms.invalidFormat})
  @Min(Bedroom.Min, {message: OfferValidationMessage.bedrooms.minValue})
  @Max(Bedroom.Max, {message: OfferValidationMessage.bedrooms.maxValue})
  public bedrooms: number;

  @IsInt({message: OfferValidationMessage.guests.invalidFormat})
  @Min(Guest.Min, {message: OfferValidationMessage.guests.minValue})
  @Max(Guest.Max, {message: OfferValidationMessage.guests.maxValue})
  public guests: number;

  @IsInt({message: OfferValidationMessage.price.invalidFormat})
  @Min(Price.Min, {message: OfferValidationMessage.price.minValue})
  @Max(Price.Max, {message: OfferValidationMessage.price.maxValue})
  public price: number;

  @IsArray({message: OfferValidationMessage.goods.invalidFormat})
  @ArrayMinSize(GOODS_MIN_SIZE, {message: OfferValidationMessage.goods.minSize})
  @IsEnum(Facilities, {each: true, message: OfferValidationMessage.goods.invalid})
  public goods: `${Facilities}`[];

  public user: string;

  @IsObject({message: OfferValidationMessage.location.invalidFormat})
  public location: string | Location;
}
