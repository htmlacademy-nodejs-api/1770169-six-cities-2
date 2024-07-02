import {Container} from 'inversify';

import {types} from '@typegoose/typegoose';

import {DefaultOfferService} from './default-offer.service.js';
import {OfferService} from './offer-service.interface.js';
import {OfferEntity, OfferModel} from './offer.entity.js';
import {Component} from '../../constants/index.js';
import {OfferController} from './offer.controller.js';
import {FavoriteOfferController} from './favorite-offer.controller.js';
import {PremiumOfferController} from './premium-offer.controller.js';
import {Controller} from '../../libs/rest/index.js';

export function createOfferContainer() {
  const container = new Container();
  container.bind<types.ModelType<OfferEntity>>(Component.OfferModel).toConstantValue(OfferModel);
  container.bind<OfferService>(Component.OfferService).to(DefaultOfferService).inSingletonScope();
  container.bind<Controller>(Component.OfferController).to(OfferController).inSingletonScope();
  container.bind<Controller>(Component.FavoriteOfferController).to(FavoriteOfferController).inSingletonScope();
  container.bind<Controller>(Component.PremiumOfferController).to(PremiumOfferController).inSingletonScope();

  return container;
}
