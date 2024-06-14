import {inject, injectable} from 'inversify';

import * as Mongoose from 'mongoose';

import {setTimeout} from 'node:timers/promises';

import {DatabaseClient} from './database-client.interface.js';
import {Component} from '../../constants/index.js';
import {Logger} from '../logger/index.js';
import {ErrorMessage, InfoMessage, Retry} from './database-client.constant.js';
import {createMessage} from '../../helpers/index.js';

@injectable()
export class MongoDatabaseClient implements DatabaseClient {
  private mongoose: typeof Mongoose;
  private isConnected: boolean = false;

  constructor(
    @inject(Component.Logger) private readonly logger: Logger
  ) {}

  public async connect(uri: string): Promise<void> {
    if (this.isConnected) {
      throw new Error(ErrorMessage.ALREADY_CONNECTED_MESSAGE);
    }
    this.logger.info(InfoMessage.TRYING_CONNECT_MESSAGE);
    let attempt = 0;

    while (attempt < Retry.Count) {
      try {
        this.mongoose = await Mongoose.connect(uri);
        this.isConnected = true;
        this.logger.info(InfoMessage.CONNECT_MESSAGE);
        return;
      } catch (error) {
        attempt++;
        this.logger.error(createMessage(ErrorMessage.CONNECTION_ATTEMPT_MESSAGE, [attempt]), error as Error);
        await setTimeout(Retry.Timeout);
      }
    }
    throw new Error(createMessage(ErrorMessage.FAILED_CONNECT_MESSAGE, [Retry.Count]));
  }

  public async disconnect(): Promise<void>{
    if (!this.isConnected) {
      throw new Error(ErrorMessage.NOT_CONNECTED_MESSAGE);
    }
    await this.mongoose.disconnect?.();
    this.isConnected = false;
    this.logger.info(InfoMessage.DISCONNECT_MESSAGE);
  }
}
