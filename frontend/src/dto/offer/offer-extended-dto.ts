import { UserDto } from '../user/user-dto';
import { OfferDto } from './offer-dto';
import { Location } from '../../types/types';

export class OfferExtendedDto extends OfferDto {
  public description!: string;
  public images!: string[];
  public bedrooms!: number;
  public guests!: number;
  public goods!: string[];
  public location!: Location;
  public user!: UserDto;
}
