import {DocumentType} from '@typegoose/typegoose';

import {CreateLocationDto} from './dto/create-location.dto.js';
import {LocationEntity} from './location.entity.js';

export interface LocationService {
  create(dto: CreateLocationDto): Promise<DocumentType<LocationEntity>>;
  findOrCreate(dto: CreateLocationDto): Promise<DocumentType<LocationEntity>>;
}
