import {inject, injectable} from 'inversify';
import 'reflect-metadata';

import {Component, ProcessMessage} from '../shared/constants/index.js';
import {Config, RestSchema} from '../shared/libs/config/index.js';
import {Logger} from '../shared/libs/logger/index.js';

@injectable()
export class RestApplication {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<RestSchema>
  ) {}

  public init() {
    this.logger.info(`${ProcessMessage.REST_APP_INIT_MESSAGE}${this.config.get('PORT')}`);
  }
}
