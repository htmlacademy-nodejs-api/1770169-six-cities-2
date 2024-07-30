import { UserType } from '../../const';

export class CreateUserDto {
  public name!: string;
  public email!: string;
  public avatar?: File;
  public password!: string;
  public userType!: `${UserType}`;
}
