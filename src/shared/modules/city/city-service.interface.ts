import {DocumentType} from '@typegoose/typegoose';

import {CityEntity} from './city.entity.js';
import {CreateCityDto} from './dto/create-city.dto.js';
import {DocumentExists} from '../../libs/rest/index.js';

export interface CityService extends DocumentExists {
  create(dto: CreateCityDto): Promise<DocumentType<CityEntity>>;
  findOrCreate(dto: CreateCityDto): Promise<DocumentType<CityEntity>>;
  findByCityName(cityName: string): Promise<DocumentType<CityEntity> | null>;
}
