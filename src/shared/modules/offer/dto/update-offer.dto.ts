import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsObject,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength
} from 'class-validator';

import {Facilities, Housing, Location, OfferCity} from '../../../types/index.js';
import {OfferValidationMessage} from './offer-validation-message.js';
import {Bedroom, Description, GOODS_MIN_SIZE, Guest, IMAGES_SIZE, Price, Title} from '../offer.constant.js';

export class UpdateOfferDto {
  @IsOptional()
  @IsString({message: OfferValidationMessage.title.invalidFormat})
  @MinLength(Title.Min, {message: OfferValidationMessage.title.minLength})
  @MaxLength(Title.Max, {message: OfferValidationMessage.title.maxLength})
  public title?: string;

  @IsOptional()
  @IsString({message: OfferValidationMessage.description.invalidFormat})
  @MinLength(Description.Min, {message: OfferValidationMessage.description.minLength})
  @MaxLength(Description.Max, {message: OfferValidationMessage.description.maxLength})
  public description?: string;

  @IsOptional()
  @IsDateString({}, {message: OfferValidationMessage.date.invalidFormat})
  public date?: Date;

  @IsOptional()
  @IsEnum(OfferCity, {message: OfferValidationMessage.type.invalid})
  public city?: OfferCity;

  @IsOptional()
  @IsString({message: OfferValidationMessage.previewImage.invalidFormat})
  public previewImage?: string;

  @IsOptional()
  @IsArray({message: OfferValidationMessage.images.invalidFormat})
  @ArrayMinSize(IMAGES_SIZE, {message: OfferValidationMessage.images.size})
  @ArrayMaxSize(IMAGES_SIZE, {message: OfferValidationMessage.images.size})
  public images?: string[];

  @IsOptional()
  @IsBoolean({message: OfferValidationMessage.isPremium.invalidFormat})
  public isPremium?: boolean;

  @IsOptional()
  @IsBoolean({message: OfferValidationMessage.isFavorite.invalidFormat})
  public isFavorite?: boolean;

  @IsOptional()
  @IsEnum(Housing, {each: true, message: OfferValidationMessage.type.invalid})
  public type?: `${Housing}`;

  @IsOptional()
  @IsInt({message: OfferValidationMessage.bedrooms.invalidFormat})
  @Min(Bedroom.Min, {message: OfferValidationMessage.bedrooms.minValue})
  @Max(Bedroom.Max, {message: OfferValidationMessage.bedrooms.maxValue})
  public bedrooms?: number;

  @IsOptional()
  @IsInt({message: OfferValidationMessage.guests.invalidFormat})
  @Min(Guest.Min, {message: OfferValidationMessage.guests.minValue})
  @Max(Guest.Max, {message: OfferValidationMessage.guests.maxValue})
  public guests?: number;

  @IsOptional()
  @IsInt({message: OfferValidationMessage.price.invalidFormat})
  @Min(Price.Min, {message: OfferValidationMessage.price.minValue})
  @Max(Price.Max, {message: OfferValidationMessage.price.maxValue})
  public price?: number;

  @IsOptional()
  @IsArray({message: OfferValidationMessage.goods.invalidFormat})
  @ArrayMinSize(GOODS_MIN_SIZE, {message: OfferValidationMessage.goods.minSize})
  @IsEnum(Facilities, {each: true, message: OfferValidationMessage.goods.invalid})
  public goods?: `${Facilities}`[];

  @IsOptional()
  @IsObject({message: OfferValidationMessage.location.invalidFormat})
  public location?: string | Location;
}
