import {DocumentType} from '@typegoose/typegoose';

import {CreateUserDto} from './dto/create-user.dto.js';
import {UserEntity} from './user.entity.js';
import {UpdateUserDto} from './dto/update-user.dto.js';
import {DocumentExists} from '../../libs/rest/index.js';

export interface UserService extends DocumentExists {
  create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>>;
  findByEmail(email: string): Promise<DocumentType<UserEntity> | null>;
  findById(userId: string): Promise<DocumentType<UserEntity> | null>;
  uploadAvatar(userId: string, dto: UpdateUserDto): Promise<DocumentType<UserEntity> | null>;
}
