import {DEFAULT_PASSWORD, RADIX, Separator} from '../constants/index.js';
import {Facilities, Housing, Offer, OfferCity} from '../types/index.js';
import {UserType} from '../types/user-type.enum.js';

export const createOffer = (offerData: string): Offer => {
  const [
    title,
    description,
    date,
    cityName,
    cityLatitude,
    cityLongitude,
    previewImage,
    images,
    isPremium,
    isFavorite,
    type,
    bedrooms,
    guests,
    price,
    goods,
    userName,
    email,
    avatar,
    userType,
    comments,
    latitude,
    longitude,
  ] = offerData.replace(Separator.Line, Separator.Empty).split(Separator.Value);

  return {
    title,
    description,
    date: new Date(date),
    city: {
      name: cityName as OfferCity,
      location: {
        latitude: Number.parseFloat(cityLatitude),
        longitude: Number.parseFloat(cityLongitude)
      }
    },
    previewImage,
    images: images.split(Separator.Enumeration).map((image) => image),
    isPremium: Boolean(isPremium),
    isFavorite: Boolean(isFavorite),
    type: type as `${Housing}`,
    bedrooms: Number.parseInt(bedrooms, RADIX),
    guests: Number.parseInt(guests, RADIX),
    price: Number.parseInt(price, RADIX),
    goods: goods.split(Separator.Enumeration).map((good) => good) as `${Facilities}`[],
    user: {
      name: userName,
      email,
      avatar,
      password: DEFAULT_PASSWORD,
      userType: userType as UserType
    },
    comments: Number.parseInt(comments, RADIX),
    location: {
      latitude: Number.parseFloat(latitude),
      longitude: Number.parseFloat(longitude),
    }
  };
};
