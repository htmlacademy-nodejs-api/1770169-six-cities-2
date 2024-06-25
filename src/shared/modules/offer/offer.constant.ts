export const COLLECTION_NAME = 'offer';

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
};

export const AGGREGATION_OPERATIONS = {
  User: [
    {
      $lookup: {
        from: 'user',
        localField: 'userId',
        foreignField: '_id',
        as: 'userId'
      }
    },
    { $unwind: '$userId' }
  ],
  City: [
    {
      $lookup: {
        from: 'city',
        localField: 'cityId',
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
        localField: 'city.locationId',
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
        localField: 'locationId',
        foreignField: '_id',
        as: 'locationId'
      }
    },
    { $unwind: '$locationId' }
  ],
  Comment: [
    {
      $lookup: {
        from: 'comment',
        let: { offerId: '$_id' },
        pipeline: [
          { $match: { $expr: { $eq: ['$$offerId', '$offerId'] } } },
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
    { $addFields: { cityId: '$city' } },
    {
      $addFields: {
        'cityId.locationId': '$cityLocation',
        rating: { $ifNull: [{ $round: [{ $avg: '$comments.rating' }, 1] }, 0] },
        commentsCount: { $size: '$comments' },
      }
    },
    { $unset: 'comments' },
    { $unset: 'cityLocation' },
    { $unset: 'city' },
  ]
};
