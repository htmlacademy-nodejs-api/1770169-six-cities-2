import { UserType } from '../../const';

export class UserDto {
  public id!: string;
  public email!: string;
  public name!: string;
  public avatar!: string;
  public type!: UserType;
}
