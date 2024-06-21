import {inject, injectable} from 'inversify';

import {DocumentType, mongoose, types} from '@typegoose/typegoose';

import {CreateOfferDto} from './dto/create-offer.dto.js';
import {UpdateOfferDto} from './dto/update-offer.dto.js';
import {OfferService} from './offer-service.interface.js';
import {OfferEntity} from './offer.entity.js';
import {Component, Sort} from '../../constants/index.js';
import {Logger} from '../../libs/logger/index.js';
import {createMessage} from '../../helpers/index.js';
import {MaxView, InfoMessage, AGGREGATION_OPERATIONS} from './offer.constant.js';

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(createMessage(InfoMessage.CREATE_OFFER_MESSAGE, [result.title]));

    return result;
  }

  public async updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    const result = await this.offerModel
      .findByIdAndUpdate(offerId, dto, {new: true})
      .exec();
    if (result !== null) {
      this.logger.info(createMessage(InfoMessage.UPDATE_OFFER_MESSAGE, [result.title]));
    }

    return result;
  }

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return await this.offerModel
      .findByIdAndDelete(offerId)
      .exec();
  }

  public async find(count: number = MaxView.Offer): Promise<DocumentType<OfferEntity>[]> {
    return await this.offerModel
      .aggregate([
        ...AGGREGATION_OPERATIONS.City,
        ...AGGREGATION_OPERATIONS.CityLocation,
        ...AGGREGATION_OPERATIONS.Comment,
        ...AGGREGATION_OPERATIONS.Offer,
        {$limit: count},
        {$sort: {createdAt: Sort.DOWN}}
      ]);
  }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    const result = await this.offerModel
      .aggregate([
        {$match: {'_id': new mongoose.Types.ObjectId(offerId)}},
        ...AGGREGATION_OPERATIONS.City,
        ...AGGREGATION_OPERATIONS.User,
        ...AGGREGATION_OPERATIONS.Location,
        ...AGGREGATION_OPERATIONS.CityLocation,
        ...AGGREGATION_OPERATIONS.Comment,
        ...AGGREGATION_OPERATIONS.OfferExtended
      ]);

    return result.length ? result[0] : null;
  }

  public async findByPremium(cityName: string): Promise<DocumentType<OfferEntity>[]> {
    return await this.offerModel
      .aggregate([
        ...AGGREGATION_OPERATIONS.City,
        ...AGGREGATION_OPERATIONS.CityLocation,
        ...AGGREGATION_OPERATIONS.Comment,
        ...AGGREGATION_OPERATIONS.Offer,
        {$match: {$and: [{isPremium: true}, {'city.name': cityName}]}},
        {$limit: MaxView.PremiumOffer},
        {$sort: {createdAt: Sort.DOWN}}
      ]);
  }

  public async findByFavorite(): Promise<DocumentType<OfferEntity>[]> {
    return await this.offerModel
      .aggregate([
        ...AGGREGATION_OPERATIONS.City,
        ...AGGREGATION_OPERATIONS.CityLocation,
        ...AGGREGATION_OPERATIONS.Comment,
        ...AGGREGATION_OPERATIONS.Offer,
        {$match: {isPremium: true}}
      ]);
  }
}
