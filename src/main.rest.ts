import {Container} from 'inversify';
import {RestApplication} from './rest/index.js';
import {Component} from './shared/constants/index.js';
import {createRestApplicationContainer} from './rest/index.js';
import {createUserContainer} from './shared/modules/user/index.js';
import {createOfferContainer} from './shared/modules/offer/index.js';

function bootstrap(): void {
  const appContainer = Container.merge(
    createRestApplicationContainer(),
    createUserContainer(),
    createOfferContainer()
  );
  const app = appContainer.get<RestApplication>(Component.RestApplication);

  app.init();
}

bootstrap();
