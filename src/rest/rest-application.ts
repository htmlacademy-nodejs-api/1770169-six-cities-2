import {Config, RestSchema} from '../shared/libs/config/index.js';
import {Logger} from '../shared/libs/logger/index.js';

export class RestApplication {
  constructor(
    private readonly logger: Logger,
    private readonly config: Config<RestSchema>
  ) {}

  public init() {
    this.logger.info(`Rest application has been initialized on port ${this.config.get('PORT')}.`);
  }
}
