import {defaultClasses, getModelForClass, modelOptions, prop} from '@typegoose/typegoose';

import {createSHA256} from './../../helpers/index.js';
import {User} from '../../types/index.js';
import {COLLECTION_NAME, DEFAULT_USER_AVATAR} from './user.constant.js';
import {UserType} from '../../types/user-type.enum.js';

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
  @prop({required: true})
  public name: string;

  @prop({required: true, unique: true})
  public email: string;

  @prop({default: DEFAULT_USER_AVATAR})
  public avatar?: string;

  @prop({required: true})
  public password: string;

  @prop({required: true})
  public userType: `${UserType}`;

  constructor (data: User) {
    super();

    this.name = data.name;
    this.email = data.email;
    this.avatar = data.avatar;
    this.userType = data.userType;
  }

  public getPassword() {
    return this.password;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public verifyPassword(password: string, salt: string) {
    const hashedPassword = createSHA256(password, salt);
    return this.password === hashedPassword;
  }
}

export const UserModel = getModelForClass(UserEntity);
