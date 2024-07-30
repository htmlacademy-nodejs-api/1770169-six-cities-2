import { GOODS, UserType } from '../const';
import { CommentRdo } from '../dto/comment/comment.dto';
import { OfferDto } from '../dto/offer/offer-dto';
import { OfferExtendedDto } from '../dto/offer/offer-extended-dto';
import { UserDto } from '../dto/user/user-dto';
import { Offer, User, Comment } from '../types/types';

export const adaptUserToClient = (user: UserDto): User => ({
  name: user.name,
  avatarUrl: user.avatar,
  type: user.type,
  email: user.email
});

export const adaptOfferToClient = (offer: OfferExtendedDto): Offer => ({
  id: offer.id,
  price: offer.price,
  rating: offer.rating,
  title: offer.title,
  isPremium: offer.isPremium,
  isFavorite: offer.isFavorite,
  city: offer.city,
  location: offer.location,
  previewImage: offer.previewImage,
  type: offer.type,
  bedrooms: offer.bedrooms,
  description: offer.description,
  goods: offer.goods,
  host: {
    name: offer.user.name,
    avatarUrl: offer.user.avatar,
    type: offer.user.type,
    email: offer.user.email,
  },
  images: offer.images,
  maxAdults: offer.guests
});

export const adaptOffersToClient = (offer: OfferDto): Offer => ({
  id: offer.id,
  price: offer.price,
  rating: offer.rating,
  title: offer.title,
  isPremium: offer.isPremium,
  isFavorite: offer.isFavorite,
  city: offer.city,
  previewImage: offer.previewImage,
  type: offer.type,
  bedrooms: 2,
  maxAdults: 2,
  description: 'Some description.',
  goods: GOODS,
  host: {
    name: 'userName',
    avatarUrl: 'defaultAvatar.jpg',
    type: UserType.Regular,
    email: 'user@mail.com',
  },
  images: [offer.previewImage],
  location: {
    latitude: offer.city.location.latitude,
    longitude: offer.city.location.longitude
  }
});

export const adaptCommentToClient = (comment: CommentRdo): Comment => ({
  id: comment.id,
  comment: comment.comment,
  date: comment.date,
  rating: comment.rating,
  user: {
    name: comment.user.name,
    avatarUrl: comment.user.avatar,
    type: comment.user.type,
    email: comment.user.email,
  }
});
