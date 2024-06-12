import {Container} from 'inversify';

import {types} from '@typegoose/typegoose';

import {Component} from '../../constants/index.js';
import {CityEntity, CityModel} from './city.entity.js';
import {CityService} from './city-service.interface.js';
import {DefaultCityService} from './default-city.service.js';

export function createCityContainer() {
  const container = new Container();
  container.bind<types.ModelType<CityEntity>>(Component.CityModel).toConstantValue(CityModel);
  container.bind<CityService>(Component.CityService).to(DefaultCityService).inSingletonScope();

  return container;
}
