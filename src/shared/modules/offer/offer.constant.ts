export const COLLECTION_NAME = 'offer';
export const DETAIL = 'OfferController';
export const IMAGES_SIZE = 6;
export const GOODS_MIN_SIZE = 1;

export enum MaxView {
  Image = 6,
  Offer = 60,
  PremiumOffer = 3
}

export enum Title {
  Min = 10,
  Max = 100
}

export enum Description {
  Min = 20,
  Max = 1024
}

export enum Rating {
  Min = 1,
  Max = 5
}

export enum Bedroom {
  Min = 1,
  Max = 8
}

export enum Guest {
  Min = 1,
  Max = 10
}

export enum Price {
  Min = 100,
  Max = 100000
}

export const InfoMessage = {
  CREATE_OFFER_MESSAGE: 'New \'%offerName%\' offer has been successfully created.',
  UPDATE_OFFER_MESSAGE: 'The \'%offerName%\' offer has been successfully updated.',
  REGISTER_OFFER_ROUTES_MESSAGE: 'Register routes for OfferController.',
  REGISTER_FAVORITE_OFFER_ROUTES_MESSAGE: 'Register routes for FavoriteOfferController.',
  REGISTER_PREMIUM_OFFER_ROUTES_MESSAGE: 'Register routes for PremiumOfferController.'
};

export const AGGREGATION_OPERATIONS = {
  User: [
    {
      $lookup: {
        from: 'user',
        localField: 'user',
        foreignField: '_id',
        as: 'user'
      }
    },
    { $unwind: '$user' }
  ],
  City: [
    {
      $lookup: {
        from: 'city',
        localField: 'city',
        foreignField: '_id',
        as: 'city'
      }
    },
    { $unwind: '$city' }
  ],
  CityLocation: [
    {
      $lookup: {
        from: 'location',
        localField: 'city.location',
        foreignField: '_id',
        as: 'cityLocation'
      }
    },
    { $unwind: '$cityLocation' }
  ],
  Location: [
    {
      $lookup: {
        from: 'location',
        localField: 'location',
        foreignField: '_id',
        as: 'location'
      }
    },
    { $unwind: '$location' }
  ],
  Comment: [
    {
      $lookup: {
        from: 'comment',
        let: { offerId: '$_id' },
        pipeline: [
          { $match: { $expr: { $eq: ['$$offerId', '$offer'] } } },
          {
            $project: {
              _id: 1,
              rating: 1
            }
          }
        ],
        as: 'comments'
      }
    }
  ],
  AddFields: [
    { $addFields: { city: '$city' } },
    {
      $addFields: {
        'city.location': '$cityLocation',
        rating: { $ifNull: [{ $round: [{ $avg: '$comments.rating' }, 1] }, 0] },
        commentsCount: { $size: '$comments' },
      }
    },
    { $unset: 'comments' },
    { $unset: 'cityLocation' }
  ]
};
