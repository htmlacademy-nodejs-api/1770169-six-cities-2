import {DocumentType} from '@typegoose/typegoose';

import {CreateLocationDto} from './dto/create-location.dto.js';
import {LocationEntity} from './location.entity.js';
import {DocumentExists} from '../../libs/rest/index.js';

export interface LocationService extends DocumentExists {
  create(dto: CreateLocationDto): Promise<DocumentType<LocationEntity>>;
  findOrCreate(dto: CreateLocationDto): Promise<DocumentType<LocationEntity>>;
  updateById(cityId: string, dto: CreateLocationDto): Promise<DocumentType<LocationEntity> | null>;
}
