import {DocumentType} from '@typegoose/typegoose';
import {OfferEntity} from './offer.entity.js';
import {CreateOfferDto} from './dto/create-offer.dto.js';

export interface OfferService {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  updateById(id: string, dto: CreateOfferDto): Promise<DocumentType<OfferEntity> | null>;
  deleteById(id: string, dto: CreateOfferDto): Promise<DocumentType<OfferEntity> | null>;
  find(): Promise<DocumentType<OfferEntity>[]>;
  findById(id: string): Promise<DocumentType<OfferEntity> | null>;
  findByPremium(city: string): Promise<DocumentType<OfferEntity>[]>;
  findByFavorite(): Promise<DocumentType<OfferEntity>[]>;
}
