import {DocumentType} from '@typegoose/typegoose';

import {OfferEntity} from './offer.entity.js';
import {CreateOfferDto} from './dto/create-offer.dto.js';
import {UpdateOfferDto} from './dto/update-offer.dto.js';

export interface OfferService {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null>;
  deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  find(count: number): Promise<DocumentType<OfferEntity>[]>;
  findById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  findByPremium(city: string): Promise<DocumentType<OfferEntity>[]>;
  findByFavorite(): Promise<DocumentType<OfferEntity>[]>;
  addOrRemoveFavorite(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null>
}
