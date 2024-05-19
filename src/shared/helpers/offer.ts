import {RADIX} from '../constants/index.js';
import {CityName, Offer} from '../types/index.js';

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
    rating,
    type,
    bedrooms,
    maxGuests,
    price,
    goods,
    userName,
    email,
    avatar,
    password,
    isPro,
    comments,
    latitude,
    longitude,
  ] = offerData.replace('\n', '').split('\t');

  return {
    title,
    description,
    date: new Date(date),
    city: {
      name: cityName as CityName,
      location: {
        latitude: Number.parseFloat(cityLatitude),
        longitude: Number.parseFloat(cityLongitude)
      }
    },
    previewImage,
    images: images.split(';').map((image) => image),
    isPremium: Boolean(isPremium),
    isFavorite: Boolean(isFavorite),
    rating: Number.parseFloat(rating),
    type,
    bedrooms: Number.parseInt(bedrooms, RADIX),
    maxGuests: Number.parseInt(maxGuests, RADIX),
    price: Number.parseInt(price, RADIX),
    goods: goods.split(';').map((good) => good),
    host: {
      name: userName,
      email,
      avatar,
      password,
      isPro: Boolean(isPro)
    },
    comments: Number.parseInt(comments, RADIX),
    location: {
      latitude: Number.parseFloat(latitude),
      longitude: Number.parseFloat(longitude),
    }
  };
};
