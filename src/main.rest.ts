import {Container} from 'inversify';

import {RestApplication} from './rest/index.js';
import {PinoLogger} from './shared/libs/logger/index.js';
import {RestConfig} from './shared/libs/config/index.js';
import {Component} from './shared/constants/index.js';

function bootstrap(): void {
  const container = new Container();
  container.bind<RestApplication>(Component.RestApplication).to(RestApplication).inSingletonScope();
  container.bind<PinoLogger>(Component.Logger).to(PinoLogger).inSingletonScope();
  container.bind<RestConfig>(Component.Config).to(RestConfig).inSingletonScope();

  const app = container.get<RestApplication>(Component.RestApplication);

  app.init();
}

bootstrap();
