import {Expose, Type} from 'class-transformer';

import {OfferRdo} from './offer-rdo.js';
import {LocationRdo} from '../../location/index.js';
import {UserRdo} from '../../user/index.js';

export class OfferExtendedRdo extends OfferRdo {
  @Expose()
  public description: string;

  @Expose()
  public images: string[];

  @Expose()
  public bedrooms: number;

  @Expose()
  public guests: number;

  @Expose()
  public goods: string[];

  @Expose()
  @Type(() => LocationRdo)
  public location: LocationRdo;

  @Expose()
  @Type(() => UserRdo)
  public user: UserRdo;
}
