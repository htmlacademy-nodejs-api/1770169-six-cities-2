import cors from 'cors';

import express, {Express} from 'express';

import {inject, injectable} from 'inversify';
import 'reflect-metadata';

import {Component} from '../shared/constants/index.js';
import {Config, RestSchema} from '../shared/libs/config/index.js';
import {Logger} from '../shared/libs/logger/index.js';
import {getMongoURI, getFullServerHost, createMessage} from '../shared/helpers/index.js';
import {BaseRout, Directory, InfoMessage} from './rest.constant.js';
import {DatabaseClient} from '../shared/libs/database-client/index.js';
import {Controller, ExceptionFilter, ParseTokenMiddleware} from '../shared/libs/rest/index.js';

@injectable()
export class RestApplication {
  private readonly server: Express;

  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<RestSchema>,
    @inject(Component.Database) private readonly databaseClient: DatabaseClient,
    @inject(Component.AppExceptionFilter) private readonly appExceptionFilter: ExceptionFilter,
    @inject(Component.HttpExceptionFilter) private readonly httpExceptionFilter: ExceptionFilter,
    @inject(Component.ValidationExceptionFilter) private readonly validationExceptionFilter: ExceptionFilter,
    @inject(Component.OfferController) private readonly offerController: Controller,
    @inject(Component.FavoriteOfferController) private readonly favoriteOfferController: Controller,
    @inject(Component.PremiumOfferController) private readonly premiumOfferController: Controller,
    @inject(Component.CommentController) private readonly commentController: Controller,
    @inject(Component.UserController) private readonly userController: Controller
  ) {
    this.server = express();
  }

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

  private async initServer() {
    const port = this.config.get('PORT');
    this.server.listen(port);
  }

  private async initControllers() {
    this.server.use(BaseRout.Comments, this.commentController.router);
    this.server.use(BaseRout.Offers, this.offerController.router);
    this.server.use(BaseRout.Favorites, this.favoriteOfferController.router);
    this.server.use(BaseRout.Premium, this.premiumOfferController.router);
    this.server.use(BaseRout.User, this.userController.router);
  }

  private async initMiddlewares() {
    const authenticateMiddleware = new ParseTokenMiddleware(this.config.get('JWT_SECRET'));

    this.server.use(express.json());
    this.server.use(cors());
    this.server.use(Directory.Upload, express.static(this.config.get('UPLOAD_DIRECTORY')));
    this.server.use(Directory.Static, express.static(this.config.get('STATIC_DIRECTORY')));
    this.server.use(authenticateMiddleware.execute.bind(authenticateMiddleware));
  }

  private async initExceptionFilters() {
    this.server.use(this.appExceptionFilter.catch.bind(this.appExceptionFilter));
    this.server.use(this.httpExceptionFilter.catch.bind(this.httpExceptionFilter));
    this.server.use(this.validationExceptionFilter.catch.bind(this.validationExceptionFilter));
  }

  public async init() {
    this.logger.info(InfoMessage.REST_APP_INIT_MESSAGE);

    this.logger.info(InfoMessage.DATABASE_INIT_MESSAGE);
    await this.initDB();
    this.logger.info(InfoMessage.DATABASE_INIT_COMPLETED_MESSAGE);

    this.logger.info(InfoMessage.MIDDLEWARES_INIT_MESSAGE);
    await this.initMiddlewares();
    this.logger.info(InfoMessage.MIDDLEWARES_INIT_COMPLETED_MESSAGE);

    this.logger.info(InfoMessage.EXCEPTIONS_INIT_MESSAGE);
    await this.initExceptionFilters();
    this.logger.info(InfoMessage.EXCEPTIONS_INIT_COMPLETED_MESSAGE);

    this.logger.info(InfoMessage.CONTROLLERS_INIT_MESSAGE);
    await this.initControllers();
    this.logger.info(InfoMessage.CONTROLLERS_INIT_COMPLETED_MESSAGE);

    this.logger.info(InfoMessage.SERVER_INIT_MESSAGE);
    await this.initServer();
    this.logger.info(createMessage(
      InfoMessage.SERVER_INIT_COMPLETED_MESSAGE,
      [getFullServerHost(this.config.get('HOST'), this.config.get('PORT'))]
    ));
  }
}
