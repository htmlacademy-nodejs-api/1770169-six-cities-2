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
  DELETE_OFFER_MESSAGE: 'The \'%offerName%\' offer has been successfully deleted.'
};
