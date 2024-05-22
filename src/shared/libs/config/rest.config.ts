import {config} from 'dotenv';

import {Logger} from '../logger/index.js';
import {Config} from './config.interface.js';
import {RestSchema, configRestSchema} from './rest.schema.js';

export class RestConfig implements Config<RestSchema> {
  private readonly config: RestSchema;

  constructor(private readonly logger: Logger) {
    const configOutput = config();

    if(configOutput.error) {
      throw new Error('Can\'t read .env file.');
    }

    configRestSchema.load({});
    configRestSchema.validate({allowed: 'strict', output: this.logger.info});

    this.config = configRestSchema.getProperties();
    this.logger.info('.env file parsed successfully.');
  }

  public get<T extends keyof RestSchema>(key: T): RestSchema[T] {
    return this.config[key];
  }
}
