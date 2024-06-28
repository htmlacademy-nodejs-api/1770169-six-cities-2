import {Expose} from 'class-transformer';

export class LocationRdo {
  @Expose()
  public longitude: number;

  @Expose()
  public latitude: number;
}
