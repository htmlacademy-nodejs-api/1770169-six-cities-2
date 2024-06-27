import {Container} from 'inversify';

import {types} from '@typegoose/typegoose';

import {DefaultOfferService} from './default-offer.service.js';
import {OfferService} from './offer-service.interface.js';
import {OfferEntity, OfferModel} from './offer.entity.js';
import {Component} from '../../constants/index.js';
import {OfferController} from './offer.controller.js';
import {FavoriteOfferController} from './favorite-offer.controller.js';
import {PremiumOfferController} from './premium-offer.controller.js';

export function createOfferContainer() {
  const container = new Container();
  container.bind<types.ModelType<OfferEntity>>(Component.OfferModel).toConstantValue(OfferModel);
  container.bind<OfferService>(Component.OfferService).to(DefaultOfferService).inSingletonScope();
  container.bind<OfferController>(Component.OfferController).to(OfferController).inSingletonScope();
  container.bind<FavoriteOfferController>(Component.FavoriteOfferController).to(FavoriteOfferController).inSingletonScope();
  container.bind<PremiumOfferController>(Component.PremiumOfferController).to(PremiumOfferController).inSingletonScope();

  return container;
}
