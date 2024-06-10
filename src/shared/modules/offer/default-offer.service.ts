import {inject, injectable} from 'inversify';
import {DocumentType, types} from '@typegoose/typegoose';
import {CreateOfferDto} from './dto/create-offer.dto.js';
import {OfferService} from './offer-service.interface.js';
import {OfferEntity} from './offer.entity.js';
import {Component} from '../../constants/index.js';
import {Logger} from '../../libs/logger/index.js';

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer ${result.title} has been successfully created.`);

    return result;
  }

  public async updateById(id: string, dto: CreateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    const result = await this.offerModel.findByIdAndUpdate(id, dto, {new: true});
    if (result !== null) {
      this.logger.info(`The ${result.title} offer has been successfully updated.`);
    }

    return result;
  }

  public async deleteById(id: string, dto: CreateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    const result = await this.offerModel.findByIdAndDelete(id, dto);
    if (result !== null) {
      this.logger.info(`The ${result.title} offer has been successfully deleted.`);
    }

    return result;
  }

  public async find(): Promise<DocumentType<OfferEntity>[]> {
    return await this.offerModel.find().limit(60);
  }

  public async findById(id: string): Promise<DocumentType<OfferEntity> | null> {
    return await this.offerModel.findById(id);
  }

  public async findByPremium(cityName: string): Promise<DocumentType<OfferEntity>[]> {
    return await this.offerModel.find({city: {name: cityName}, isPremium: true}).limit(3);
  }

  public async findByFavorite(): Promise<DocumentType<OfferEntity>[]> {
    return await this.offerModel.find({isFavorite: true});
  }
}
