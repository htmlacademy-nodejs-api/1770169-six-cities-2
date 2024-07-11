import {Container} from 'inversify';

import {Component} from '../shared/constants/index.js';
import {RestApplication} from './index.js';
import {PinoLogger} from '../shared/libs/logger/index.js';
import {RestConfig} from '../shared/libs/config/index.js';
import {DatabaseClient, MongoDatabaseClient} from '../shared/libs/database-client/index.js';
import {AppExceptionFilter, ExceptionFilter, PathTransformer} from '../shared/libs/rest/index.js';
import {HttpExceptionFilter} from '../shared/libs/rest/index.js';
import {ValidationExceptionFilter} from '../shared/libs/rest/index.js';

export function createRestApplicationContainer() {
  const container = new Container();
  container.bind<RestApplication>(Component.RestApplication).to(RestApplication).inSingletonScope();
  container.bind<PinoLogger>(Component.Logger).to(PinoLogger).inSingletonScope();
  container.bind<RestConfig>(Component.Config).to(RestConfig).inSingletonScope();
  container.bind<DatabaseClient>(Component.Database).to(MongoDatabaseClient).inSingletonScope();
  container.bind<AppExceptionFilter>(Component.AppExceptionFilter).to(AppExceptionFilter).inSingletonScope();
  container.bind<ExceptionFilter>(Component.HttpExceptionFilter).to(HttpExceptionFilter).inSingletonScope();
  container.bind<ExceptionFilter>(Component.ValidationExceptionFilter).to(ValidationExceptionFilter).inSingletonScope();
  container.bind<PathTransformer>(Component.PathTransformer).to(PathTransformer).inSingletonScope();

  return container;
}
