import {inject, injectable} from 'inversify';
import 'reflect-metadata';

import {Component} from '../shared/constants/index.js';
import {Config, RestSchema} from '../shared/libs/config/index.js';
import {Logger} from '../shared/libs/logger/index.js';
import {createMessage, getMongoURI} from '../shared/helpers/index.js';
import {InfoMessage} from './rest.constant.js';


import { DatabaseClient } from '../shared/libs/database-client/index.js';
import { OfferService } from '../shared/modules/offer/index.js';
import { CityService } from '../shared/modules/city/index.js';
import { LocationService } from '../shared/modules/location/index.js';
import { UserService } from '../shared/modules/user/index.js';
import { CommentService } from '../shared/modules/comment/index.js';

@injectable()
export class RestApplication {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<RestSchema>,
    @inject(Component.Database) private readonly dataBase: DatabaseClient,
    @inject(Component.OfferService) private readonly offerService: OfferService,
    @inject(Component.CityService) private readonly cityService: CityService,
    @inject(Component.LocationService) private readonly locationService: LocationService,
    @inject(Component.UserService) private readonly userService: UserService,
    @inject(Component.CommentService) private readonly commentService: CommentService
  ) {}

  public async init() {
    this.logger.info(createMessage(InfoMessage.REST_APP_INIT_MESSAGE, [this.config.get('PORT')]));
    const uri = getMongoURI(
      this.config.get('DB_USER_NAME'),
      this.config.get('DB_USER_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME'),
    );
    this.dataBase.connect(uri);
    const city = await this.cityService.findByCityName('Amsterdam');
    const user = await this.userService.findByEmail('942428b398@mail.ru');
    const location = await this.locationService.create({latitude: 100000, longitude: 200000});
    this.offerService.findById('66727eb14b10a87aa38aeabc');
    this.commentService.find('66727eb14b10a87aa38aeabc');
    const commentDto = {
      comment: 'Test second comment message',
      date: new Date(),
      rating: 2.1,
      offerId: '66727eb14b10a87aa38aeabc',
      userId: user?._id.toString() ?? ''
    };
    const offerDto = {
      title: 'Some offer',
      description: 'Create test offer..........................',
      date: new Date(),
      cityId: city?._id.toString() ?? '',
      previewImage: 'default.png',
      images: [],
      isPremium: false,
      isFavorite: false,
      rating: 4.2,
      type: 'apartment',
      bedrooms: 2,
      maxGuests: 5,
      price: 1222,
      goods: ['Air conditioning', 'Breakfast'],
      userId: user?._id.toString() ?? '',
      locationId: location._id.toString(),
    };
    const data = await this.offerService.findById('66727eb14b10a87aa38aeabc');
    console.log(data);
    console.info(offerDto.date, commentDto.date);
    this.dataBase.disconnect();
  }
}
