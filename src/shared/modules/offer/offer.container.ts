import {Container} from 'inversify';

import {types} from '@typegoose/typegoose';

import {DefaultOfferService} from './default-offer.service.js';
import {OfferService} from './offer-service.interface.js';
import {OfferEntity, OfferModel} from './offer.entity.js';
import {Component} from '../../constants/index.js';

export function createOfferContainer() {
  const container = new Container();
  container.bind<types.ModelType<OfferEntity>>(Component.OfferModel).toConstantValue(OfferModel);
  container.bind<OfferService>(Component.OfferService).to(DefaultOfferService).inSingletonScope();

  return container;
}
