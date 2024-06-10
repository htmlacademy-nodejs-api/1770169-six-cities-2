import {inject, injectable} from 'inversify';
import {DocumentType, types} from '@typegoose/typegoose';
import {CreateUserDto} from './dto/create-user.dto.js';
import {UserService} from './user-service.interface.js';
import {UserEntity} from './user.entity.js';
import {Component} from '../../constants/component.constant.js';
import {Logger} from '../../libs/logger/index.js';

@injectable()
export class DefaultUserService implements UserService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.UserModel) private readonly userModel: types.ModelType<UserEntity>
  ) {}

  public async create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const foundUser = await this.userModel.findOne({email: dto.email});

    if (foundUser !== null) {
      throw new Error(`The user with this email: ${foundUser.email} has already been registered.`);
    }

    const user = new UserEntity(dto);
    user.setPassword(dto.password, salt);

    const result = await this.userModel.create(this.userModel);
    this.logger.info(`The user with this email: ${result.email} has been successfully registered.`);

    return result;
  }

  public async findByEmail(email: string): Promise<DocumentType<UserEntity> | null> {
    return await this.userModel.findOne({email: email});
  }

  public async findById(id: string): Promise<DocumentType<UserEntity> | null> {
    return await this.userModel.findById(id);
  }
}
