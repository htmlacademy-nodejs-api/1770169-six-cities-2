import {defaultClasses, getModelForClass, modelOptions, prop} from '@typegoose/typegoose';

import {createSHA256} from './../../helpers/index.js';
import {User} from '../../types/index.js';
import {
  AVATAR_EXTENSION_REGEX,
  COLLECTION_NAME,
  DEFAULT_USER_AVATAR,
  EMAIL_REGEX,
  Password,
  UserName
} from './user.constant.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: COLLECTION_NAME,
    timestamps: true
  }
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({required: true, minlength: UserName.MIN, maxlength: UserName.MAX, default: ''})
  public name: string;

  @prop({required: true, unique: true, match: EMAIL_REGEX})
  public email: string;

  @prop({match: AVATAR_EXTENSION_REGEX, default: DEFAULT_USER_AVATAR})
  public avatar: string;

  @prop({required: true, minlength: Password.MIN, maxlength: Password.MAX})
  public password: string;

  @prop({required: true, default: false})
  public isPro: boolean;

  constructor (data: User) {
    super();

    this.name = data.name;
    this.email = data.email;
    this.avatar = data.avatar;
    this.isPro = data.isPro;
  }

  public getPassword() {
    return this.password;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }
}

export const UserModel = getModelForClass(UserEntity);
