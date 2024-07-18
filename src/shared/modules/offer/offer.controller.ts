import {NextFunction, Response} from 'express';

import {inject, injectable} from 'inversify';

import {
  BaseController,
  DocumentExistsMiddleware,
  DocumentOwnerMiddleware,
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
import {InfoMessage, Route} from './offer.constant.js';
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
    this.addRoute({
      path: Route.Root,
      method: HttpMethod.Get,
      handler: this.index
    });
    this.addRoute({
      path: Route.OfferId,
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [
        new ValidateOjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware({
          service: this.offerService,
          entityName: 'Offer',
          paramName: 'offerId'
        })
      ]
    });
    this.addRoute({
      path: Route.Root,
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateOfferDto)
      ]
    });
    this.addRoute({
      path: Route.OfferId,
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateOjectIdMiddleware('offerId'),
        new ValidateDtoMiddleware(UpdateOfferDto),
        new DocumentOwnerMiddleware(this.offerService, 'Offer'),
        new DocumentExistsMiddleware({
          service: this.offerService,
          entityName: 'Offer',
          paramName: 'offerId'
        })
      ]
    });
    this.addRoute({
      path: Route.OfferId,
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateOjectIdMiddleware('offerId'),
        new DocumentOwnerMiddleware(this.offerService, 'Offer'),
        new DocumentExistsMiddleware({
          service: this.offerService,
          entityName: 'Offer',
          paramName: 'offerId'
        })
      ]
    });
  }

  public async index({query, locals}: OfferRequest, res: Response, _next: NextFunction): Promise<void> {
    const offers = await this.offerService.find(Number(query.count));

    if (locals) {
      this.ok(res, fillDto(OfferRdo, offers.map((offer) => (
        offer.user.toString() !== locals.id ? {...offer, isFavorite: false} : offer
      ))));
      return;
    }
    this.ok(res, fillDto(OfferRdo, offers.map((offer) => ({...offer, isFavorite: false}))));
  }

  public async show({params, locals}: OfferRequest, res: Response, _next: NextFunction): Promise<void> {
    const offer = await this.offerService.findById(params.offerId);

    if (locals) {
      this.ok(res, fillDto(OfferExtendedRdo, offer?.user.toString() !== locals.id ? {...offer, isFavorite: false} : offer));
      return;
    }
    this.ok(res, fillDto(OfferExtendedRdo, {...offer, isFavorite: false}));
  }

  public async create({body, locals}: OfferRequest, res: Response, _next: NextFunction): Promise<void> {
    const cityLocation = await this.locationService.findOrCreate(body.city.location);
    const city = await this.cityService.findOrCreate({name: body.city.name, location: cityLocation.id});
    const location = await this.locationService.findOrCreate(body.location as Location);
    const offer = await this.offerService.create({...body, city: city.id, user: locals.id, location: location.id});
    const foundOffer = await this.offerService.findById(offer.id);
    this.created(res, fillDto(OfferExtendedRdo, foundOffer));
  }

  public async update({body, params}: UpdateOfferRequest, res: Response, _next: NextFunction): Promise<void> {
    const update = {...body};

    if (body.city) {
      const cityLocation = await this.locationService.findOrCreate(body.city.location);
      const city = await this.cityService.findOrCreate({name: body.city.name, location: cityLocation.id});
      update.city = city.id;
    }

    if (body.location) {
      const foundOffer = await this.offerService.findById(params.offerId);
      const location = await this.locationService.updateById(foundOffer?.location.id, body.location as Location);
      update.location = location?.id;
    }
    const offer = await this.offerService.updateById(params.offerId, update);
    const foundOffer = await this.offerService.findById(offer?.id);
    this.ok(res, fillDto(OfferExtendedRdo, foundOffer));
  }

  public async delete({params}: OfferRequest, res: Response, _next: NextFunction): Promise<void> {
    await this.offerService.deleteById(params.offerId);
    await this.commentService.deleteById(params.offerId);
    this.noContent(res, null);
  }
}
