import {createSHA256} from './../../helpers/index.js';
import {User} from '../../types/index.js';
import {defaultClasses, getModelForClass, modelOptions, prop} from '@typegoose/typegoose';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users',
    timestamps: true
  }
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({required: true, min: 1, max: 15, default: ''})
  public name: string;

  @prop({required: true, unique: true, match: /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i})
  public email: string;

  @prop({match: /([^\s]+(\.(jpg|png))$)/, default: ''})
  public avatar: string;

  @prop({required: true, min: 6, max: 12, default: 'default-avatar.png'})
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
