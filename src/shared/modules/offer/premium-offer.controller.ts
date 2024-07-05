import {NextFunction, Response} from 'express';

import {inject, injectable} from 'inversify';

import {BaseController, HttpMethod} from '../../libs/rest/index.js';
import {Component} from '../../constants/index.js';
import {Logger} from '../../libs/logger/index.js';
import {OfferService} from './offer-service.interface.js';
import {OfferRequest} from './types/offer-request.type.js';
import {fillDto} from '../../helpers/index.js';
import {OfferRdo} from './rdo/offer-rdo.js';
import {InfoMessage} from './offer.constant.js';

@injectable()
export class PremiumOfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: Logger,
    @inject(Component.OfferService) private readonly offerService: OfferService
  ) {
    super(logger);

    this.logger.info(InfoMessage.REGISTER_PREMIUM_OFFER_ROUTES_MESSAGE);
    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index});
  }

  public async index({query}: OfferRequest, res: Response, _next: NextFunction): Promise<void> {
    const offers = await this.offerService.findByPremium(query.city as string);
    this.ok(res, fillDto(OfferRdo, offers));
  }
}
