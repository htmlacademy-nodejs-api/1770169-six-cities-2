import {inject, injectable} from 'inversify';

import {DocumentType, types} from '@typegoose/typegoose';

import {CreateOfferDto} from './dto/create-offer.dto.js';
import {OfferService} from './offer-service.interface.js';
import {OfferEntity} from './offer.entity.js';
import {Component, Sort} from '../../constants/index.js';
import {Logger} from '../../libs/logger/index.js';
import {createMessage} from '../../helpers/index.js';
import {MaxView, InfoMessage} from './offer.constant.js';
import mongoose from 'mongoose';

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

  public async updateById(offerId: string, dto: CreateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    const result = await this.offerModel
      .findByIdAndUpdate(offerId, dto, {new: true})
      .exec();
    if (result !== null) {
      this.logger.info(createMessage(InfoMessage.UPDATE_OFFER_MESSAGE, [result.title]));
    }

    return result;
  }

  public async deleteById(offerId: string, dto: CreateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    const result = await this.offerModel
      .findByIdAndDelete(offerId, dto)
      .exec();
    if (result !== null) {
      this.logger.info(createMessage(InfoMessage.DELETE_OFFER_MESSAGE, [result.title]));
    }

    return result;
  }

  public async find(count: number = MaxView.Offer): Promise<DocumentType<OfferEntity>[]> {
    return await this.offerModel
      .aggregate([
        {
          $lookup: {
            from: 'city',
            localField: 'cityId',
            foreignField: '_id',
            as: 'city'
          }
        },
        {$unwind: '$city'},
        {
          $lookup: {
            from: 'location',
            localField: 'city.location',
            foreignField: '_id',
            as: 'location'
          }
        },
        {$unwind: '$location'},
        {$project: {
          title: '$title',
          date: '$date',
          city: {
            name: '$city.name',
            location: {
              latitude: '$location.latitude',
              longitude: '$location.longitude'
            }
          },
          previewImage: '$previewImage',
          isPremium: '$isPremium',
          isFavorite: '$isFavorite',
          rating: '$rating',
          type: '$type',
          price: '$price',
          commentsCount: '$commentCount',
        }},
        {$limit: count},
        {$sort: {createdAt: Sort.DOWN}}
      ]);
  }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    const result = await this.offerModel
      .aggregate([
        {$match: {'_id': new mongoose.Types.ObjectId(offerId)}},
        {
          $lookup: {
            from: 'city',
            localField: 'cityId',
            foreignField: '_id',
            as: 'city'
          }
        },
        {$unwind: '$city'},
        {
          $lookup: {
            from: 'user',
            localField: 'userId',
            foreignField: '_id',
            as: 'user'
          }
        },
        {$unwind: '$user'},
        {
          $lookup: {
            from: 'location',
            localField: 'locationId',
            foreignField: '_id',
            as: 'location'
          }
        },
        {$unwind: '$location'},
        {
          $lookup: {
            from: 'location',
            localField: 'city.location',
            foreignField: '_id',
            as: 'cityLocation'
          }
        },
        {$unwind: '$cityLocation'},
        {$project: {
          title: '$title',
          description: '$description',
          date: '$date',
          city: {
            name: '$city.name',
            location: {
              latitude: '$cityLocation.latitude',
              longitude: '$cityLocation.longitude'
            }
          },
          previewImage: '$previewImage',
          images: '$images',
          isPremium: '$isPremium',
          isFavorite: '$isFavorite',
          rating: '$rating',
          type: '$type',
          bedrooms: '$bedrooms',
          maxGuests: '$maxGuests',
          price: '$price',
          goods: '$goods',
          user: {
            name: '$user.name',
            email: '$user.email',
            avatar: '$user.avatar',
            password: '$user.password',
            userType: '$user.userType',
          },
          commentCount: '$commentCount',
          location: {
            latitude: '$location.latitude',
            longitude: '$location.longitude',
          },
        }}
      ]);

    return result.length ? result[0] : null;
  }

  public async findByPremium(cityName: string): Promise<DocumentType<OfferEntity>[]> {
    return await this.offerModel
      .aggregate([
        {
          $lookup: {
            from: 'city',
            localField: 'cityId',
            foreignField: '_id',
            as: 'city'
          }
        },
        {$unwind: '$city'},
        {
          $lookup: {
            from: 'location',
            localField: 'city.location',
            foreignField: '_id',
            as: 'location'
          }
        },
        {$unwind: '$location'},
        {$project: {
          title: '$title',
          date: '$date',
          city: {
            name: '$city.name',
            location: {
              latitude: '$location.latitude',
              longitude: '$location.longitude'
            }
          },
          previewImage: '$previewImage',
          isPremium: '$isPremium',
          isFavorite: '$isFavorite',
          rating: '$rating',
          type: '$type',
          price: '$price',
          commentsCount: '$commentCount',
        }},
        {$match: {$and: [{isPremium: true}, {'city.name': cityName}]}},
        {$limit: MaxView.PremiumOffer},
        {$sort: {createdAt: Sort.DOWN}}
      ]);
  }

  public async findByFavorite(): Promise<DocumentType<OfferEntity>[]> {
    return await this.offerModel
      .aggregate([
        {
          $lookup: {
            from: 'city',
            localField: 'cityId',
            foreignField: '_id',
            as: 'city'
          }
        },
        {$unwind: '$city'},
        {
          $lookup: {
            from: 'location',
            localField: 'city.location',
            foreignField: '_id',
            as: 'location'
          }
        },
        {$unwind: '$location'},
        {$project: {
          title: '$title',
          date: '$date',
          city: {
            name: '$city.name',
            location: {
              latitude: '$location.latitude',
              longitude: '$location.longitude'
            }
          },
          previewImage: '$previewImage',
          isPremium: '$isPremium',
          isFavorite: '$isFavorite',
          rating: '$rating',
          type: '$type',
          price: '$price',
          commentsCount: '$commentCount',
        }},
        {$match: {isPremium: true}}
      ]);
  }

  public async incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {'$inc': {
        commentCount: 1,
      }}).exec();
  }
}
