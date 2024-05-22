import {RestApplication} from './rest/index.js';
import {PinoLogger} from './shared/libs/logger/index.js';
import {RestConfig} from './shared/libs/config/index.js';

function bootstrap(): void {
  const logger = new PinoLogger();
  const config = new RestConfig(logger);
  const app = new RestApplication(logger, config);

  app.init();
}

bootstrap();
