import {inject, injectable} from 'inversify';

import {config} from 'dotenv';

import {Config} from './config.interface.js';
import {Component, ErrorMessga, ProccesMessage} from '../../constants/index.js';
import {Logger} from '../logger/index.js';
import {RestSchema, configRestSchema} from './rest.schema.js';

@injectable()
export class RestConfig implements Config<RestSchema> {
  private readonly config: RestSchema;

  constructor(@inject(Component.Logger) private readonly logger: Logger) {
    const configOutput = config();

    if(configOutput.error) {
      throw new Error(ErrorMessga.ENV_READ_MESSAGE);
    }

    configRestSchema.load({});
    configRestSchema.validate({allowed: 'strict', output: this.logger.info});

    this.config = configRestSchema.getProperties();
    this.logger.info(ProccesMessage.ENV_READ_MESSAGE);
  }

  public get<T extends keyof RestSchema>(key: T): RestSchema[T] {
    return this.config[key];
  }
}
