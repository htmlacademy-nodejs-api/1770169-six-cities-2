import {NextFunction, Response} from 'express';

import {inject, injectable} from 'inversify';

import {
  BaseController,
  DocumentExistsMiddleware,
  HttpMethod,
  PrivateRouteMiddleware,
  ValidateDtoMiddleware,
  ValidateOjectIdMiddleware
} from '../../libs/rest/index.js';
import {Component} from '../../constants/index.js';
import {Logger} from '../../libs/logger/index.js';
import {OfferService} from './offer-service.interface.js';
import {fillDto} from '../../helpers/index.js';
import {OfferRdo} from './rdo/offer-rdo.js';
import {OfferRequest, UpdateOfferRequest} from './types/offer-request.type.js';
import {CityService} from '../city/index.js';
import {LocationService} from '../location/index.js';
import {Location} from '../../types/index.js';
import {OfferExtendedRdo} from './rdo/offer-extended-rdo.js';
import {InfoMessage} from './offer.constant.js';
import {CommentService} from './../comment/index.js';
import {CreateOfferDto} from './dto/create-offer.dto.js';
import {UpdateOfferDto} from './dto/update-offer.dto.js';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService,
    @inject(Component.CityService) private readonly cityService: CityService,
    @inject(Component.LocationService) private readonly locationService: LocationService,
    @inject(Component.CommentService) private readonly commentService: CommentService
  ) {
    super(logger);

    this.logger.info(InfoMessage.REGISTER_OFFER_ROUTES_MESSAGE);
    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index});
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [
        new ValidateOjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware({service: this.offerService, entityName: 'Offer', paramName: 'offerId'})
      ]
    });
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateOfferDto),
        new DocumentExistsMiddleware({
          service: this.cityService,
          entityName: 'City',
          bodyField: 'city'
        })
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateOjectIdMiddleware('offerId'),
        new ValidateDtoMiddleware(UpdateOfferDto),
        new DocumentExistsMiddleware({
          service: this.offerService,
          entityName: 'Offer',
          paramName: 'offerId',
          bodyField: 'city'
        })
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateOjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware({
          service: this.offerService,
          entityName: 'Offer',
          paramName: 'offerId'
        })
      ]
    });
  }

  public async index({query}: OfferRequest, res: Response, _next: NextFunction): Promise<void> {
    const offers = await this.offerService.find(Number(query.count));
    this.ok(res, fillDto(OfferRdo, offers));
  }

  public async show({params}: OfferRequest, res: Response, _next: NextFunction): Promise<void> {
    const offer = await this.offerService.findById(params.offerId);
    this.ok(res, fillDto(OfferExtendedRdo, offer));
  }

  public async create({body, locals}: OfferRequest, res: Response, _next: NextFunction): Promise<void> {
    const city = await this.cityService.findByCityName(body.city);
    const location = await this.locationService.findOrCreate(body.location as Location);
    const offer = await this.offerService.create({...body, city: city?.id, user: locals.id, location: location.id});
    this.created(res, fillDto(OfferRdo, offer));
  }

  public async update({body, params}: UpdateOfferRequest, res: Response, _next: NextFunction): Promise<void> {
    const update = {...body};

    if (body.city) {
      const city = await this.cityService.findByCityName(body.city);
      update.city = city?.id;
    }

    if (body.location) {
      const foundOffer = await this.offerService.findById(params.offerId);
      const location = await this.locationService.updateById(foundOffer?.location.id, body.location as Location);
      update.location = location?.id;
    }
    const offer = await this.offerService.updateById(params.offerId, update);
    this.ok(res, fillDto(OfferRdo, offer));
  }

  public async delete({params}: OfferRequest, res: Response, _next: NextFunction): Promise<void> {
    await this.offerService.deleteById(params.offerId);
    await this.commentService.deleteById(params.offerId);
    this.noContent(res, null);
  }
}
