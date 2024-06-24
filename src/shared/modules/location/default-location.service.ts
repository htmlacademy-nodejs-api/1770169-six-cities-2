import {inject, injectable} from 'inversify';

import {DocumentType, types} from '@typegoose/typegoose';

import {Component} from '../../constants/index.js';
import {Logger} from '../../libs/logger/index.js';
import {LocationService} from './location-service.interface.js';
import {CreateLocationDto} from './dto/create-location.dto.js';
import {LocationEntity} from './location.entity.js';
import {InfoMessage} from './location.constant.js';

@injectable()
export class DefaultLocationService implements LocationService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.LocationModel) private readonly locationModel: types.ModelType<LocationEntity>
  ) {}

  public async create(dto: CreateLocationDto): Promise<DocumentType<LocationEntity>> {
    const result = await this.locationModel.create(dto);
    this.logger.info(InfoMessage.CREATE_LOCATION_MESSAGE);

    return result;
  }

  public async findOrCreate(dto: CreateLocationDto): Promise<DocumentType<LocationEntity>> {
    const existedLocation = await this.locationModel
      .findOne({$and: [{latitude: dto.latitude}, {longitude: dto.longitude}]})
      .exec();

    if (existedLocation) {
      return existedLocation;
    }
    return this.create(dto);
  }
}
