import {IsEmail, IsString, Length} from 'class-validator';

import {UserValidationMessage} from './user-validation-message.js';
import {Password} from '../user.constant.js';

export class AuthUserDto {
  @IsEmail({}, {message: UserValidationMessage.email.invalidFormat})
  public email: string;

  @IsString({message: UserValidationMessage.password.invalidFormat})
  @Length(Password.Min, Password.Max, {message: UserValidationMessage.password.lengthField})
  public password: string;
}
