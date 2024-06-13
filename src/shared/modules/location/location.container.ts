import {Container} from 'inversify';

import {types} from '@typegoose/typegoose';

import {Component} from '../../constants/index.js';
import {LocationEntity, LocationModel} from './location.entity.js';
import {LocationService} from './location-service.interface.js';
import {DefaultLocationService} from './default-location.service.js';

export function createLocationContainer() {
  const container = new Container();
  container.bind<types.ModelType<LocationEntity>>(Component.LocationModel).toConstantValue(LocationModel);
  container.bind<LocationService>(Component.LocationService).to(DefaultLocationService).inSingletonScope();

  return container;
}
