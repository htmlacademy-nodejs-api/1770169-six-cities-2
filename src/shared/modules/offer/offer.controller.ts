import {NextFunction, Response} from 'express';

import {inject, injectable} from 'inversify';

import {StatusCodes} from 'http-status-codes';

import {BaseController, HttpMethod} from '../../libs/rest/index.js';
import {Component} from '../../constants/index.js';
import {Logger} from '../../libs/logger/index.js';
import {OfferService} from './offer-service.interface.js';
import {createMessage, fillDto} from '../../helpers/index.js';
import {OfferRdo} from './rdo/offer-rdo.js';
import {OfferRequest, UpdateOfferRequest} from './types/offer-request.type.js';
import {CityService} from '../city/index.js';
import {LocationService} from '../location/index.js';
import {Location} from '../../types/index.js';
import {OfferExtendedRdo} from './rdo/offer-extended-rdo.js';
import {HttpError} from '../../libs/rest/errors/index.js';
import {DETAIL, ErrorMessage, InfoMessage} from './offer.constant.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
    @inject(Component.CityService) private readonly cityService: CityService,
    @inject(Component.LocationService) private readonly locationService: LocationService
  ) {
    super(logger);

    this.logger.info(InfoMessage.REGISTER_OFFER_ROUTES_MESSAGE);
    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.findOffers});
    this.addRoute({path: '/:offerId', method: HttpMethod.Get, handler: this.findOffersById});
    this.addRoute({path: '/', method: HttpMethod.Post, handler: this.createOffer});
    this.addRoute({path: '/:offerId', method: HttpMethod.Put, handler: this.updateOffer});
    this.addRoute({path: '/:offerId', method: HttpMethod.Delete, handler: this.deleteOffer});
  }

  public async findOffers({query}: OfferRequest, res: Response, _next: NextFunction): Promise<void> {
    const offers = await this.offerService.find(Number(query.count));
    this.ok(res, fillDto(OfferRdo, offers));
  }

  public async findOffersById({params}: OfferRequest, res: Response, _next: NextFunction): Promise<void> {
    const offer = await this.offerService.findById(params.offerId);
    this.ok(res, fillDto(OfferExtendedRdo, offer));
  }

  public async createOffer({body}: OfferRequest, res: Response, _next: NextFunction): Promise<void> {
    const city = await this.cityService.findByCityName(body.city);
    const location = await this.locationService.findOrCreate(body.location as Location);

    if (!city) {
      throw new HttpError(StatusCodes.CONFLICT, createMessage(ErrorMessage.CITY_NOT_FOUND_MESSAGE, [body.city]), DETAIL);
    }
    const offer = await this.offerService.create({...body, city: city.id, user: '667d452a24dde3e029b27198', location: location});
    this.created(res, fillDto(OfferRdo, offer));
  }

  public async updateOffer({body, params}: UpdateOfferRequest, res: Response, _next: NextFunction): Promise<void> {
    const update = {...body};

    if (body.city) {
      const city = await this.cityService.findByCityName(body.city);

      if (!city) {
        throw new HttpError(StatusCodes.CONFLICT, createMessage(ErrorMessage.CITY_NOT_FOUND_MESSAGE, [body.city]), DETAIL);
      }
      update.city = city.id;
    }

    if (body.location) {
      const foundOffer = await this.offerService.findById(params.offerId);
      const location = await this.locationService.updateById(foundOffer?.location.id, body.location as Location);
      update.location = location?.id;
    }
    const offer = await this.offerService.updateById(params.offerId, update);
    this.ok(res, fillDto(OfferRdo, offer));
  }

  public async deleteOffer({params}: OfferRequest, res: Response, _next: NextFunction): Promise<void> {
    const offer = await this.offerService.deleteById(params.offerId);
    this.noContent(res, offer);
  }
}
