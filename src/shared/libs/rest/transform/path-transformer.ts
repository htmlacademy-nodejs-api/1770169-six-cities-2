import {inject, injectable} from 'inversify';

import {Component} from '../../../constants/index.js';
import {Logger} from '../../logger/index.js';
import {FIELDS, DEFAULT_IMAGES, InfoMessage} from './path-transformer.constant.js';
import {Config, RestSchema} from '../../config/index.js';
import {getFullServerHost} from '../../../helpers/index.js';
import {Directory} from '../../../../rest/index.js';

function isObject(value: unknown): value is Record<string, object> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

@injectable()
export class PathTransformer {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<RestSchema>
  ) {
    this.logger.info(InfoMessage.REGISTER_PATH_TRANSFORMER_MESSAGE);
  }

  private hasDefaultImage(defaultImage: string) {
    return DEFAULT_IMAGES.includes(defaultImage);
  }

  private isProperty(property: string) {
    return FIELDS.includes(property);
  }

  execute(data: Record<string, unknown>): Record<string, unknown> {
    const stack = [data];

    while(stack.length > 0) {
      const current = stack.pop();

      for(const key in current) {
        if(Object.hasOwn(current, key)) {
          const value = current[key];

          if(isObject(value)) {
            stack.push(value);
            continue;
          }

          const host = this.config.get('HOST');
          const port = this.config.get('PORT');

          if(this.isProperty(key) && typeof value === 'string') {
            const rootPath = this.hasDefaultImage(value) ? Directory.Static : Directory.Upload;
            current[key] = `${getFullServerHost(host, port)}${rootPath}/${value}`;
          } else if(this.isProperty(key) && Array.isArray(value)) {
            current[key] = value.map((item) => {
              const rootPath = this.hasDefaultImage(item) ? Directory.Static : Directory.Upload;
              return `${getFullServerHost(host, port)}${rootPath}/${item}`;
            });
          }
        }
      }
    }

    return data;
  }
}
