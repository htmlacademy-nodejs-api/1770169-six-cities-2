import {inject, injectable} from 'inversify';
import 'reflect-metadata';

import {Component} from '../shared/constants/index.js';
import {Config, RestSchema} from '../shared/libs/config/index.js';
import {Logger} from '../shared/libs/logger/index.js';
import {createMessage, getMongoURI} from '../shared/helpers/index.js';
import {InfoMessage} from './rest.constant.js';
import {DatabaseClient} from '../shared/libs/database-client/index.js';

@injectable()
export class RestApplication {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<RestSchema>,
    @inject(Component.Database) private readonly databaseClient: DatabaseClient
  ) {}

  private async initDB() {
    const uri = getMongoURI(
      this.config.get('DB_USER_NAME'),
      this.config.get('DB_USER_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME')
    );

    return this.databaseClient.connect(uri);
  }

  public async init() {
    this.logger.info('Initializing the application.');
    this.logger.info('Initializing the database...');
    await this.initDB();
    this.logger.info('The database is initialized.');
  }
}
