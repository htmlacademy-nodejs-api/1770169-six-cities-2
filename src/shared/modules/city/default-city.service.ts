import {inject, injectable} from 'inversify';

import {DocumentType, types} from '@typegoose/typegoose';

import {CityService} from './city-service.interface.js';
import {CityEntity} from './city.entity.js';
import {CreateCityDto} from './dto/create-city.dto.js';
import {Component} from '../../constants/index.js';
import {Logger} from '../../libs/logger/index.js';
import {createMessage} from '../../helpers/index.js';
import {InfoMessage} from './city.constant.js';

@injectable()
export class DefaultCityService implements CityService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.CityModel) private readonly cityModel: types.ModelType<CityEntity>
  ) {}

  public async create(dto: CreateCityDto): Promise<DocumentType<CityEntity>> {
    const result = await this.cityModel.create(dto);
    this.logger.info(createMessage(InfoMessage.CREATE_CITY_MESSAGE, [result.name]));

    return result;
  }

  public async findByCityName(cityName: string): Promise<DocumentType<CityEntity> | null> {
    return await this.cityModel
      .findOne({name: cityName})
      .exec();
  }

  public async findOrCreate(dto: CreateCityDto): Promise<DocumentType<CityEntity>> {
    const existedCity = await this.findByCityName(dto.name);

    if (existedCity) {
      return existedCity;
    }

    return this.create(dto);
  }
}
