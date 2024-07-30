import { CreateCommentDto } from '../dto/comment/create-comment.dto';
import { CreateOfferDto } from '../dto/offer/create-offer.dto';
import { CreateUserDto } from '../dto/user/create-user.dto';
import { NewComment, NewOffer, UserRegister } from '../types/types';

export const adaptUserToServer = (user: UserRegister): CreateUserDto => ({
  name: user.name,
  email: user.email,
  avatar: user.avatar,
  password: user.password,
  userType: user.type
});

export const adaptOfferToServer = (offer: NewOffer): CreateOfferDto => ({
  title: offer.title,
  description: offer.description,
  date: new Date().toISOString(),
  city: offer.city,
  previewImage: offer.previewImage,
  images: offer.images,
  isPremium: offer.isPremium,
  isFavorite: false,
  type: offer.type,
  bedrooms: offer.bedrooms,
  guests: offer.maxAdults,
  price: offer.price,
  goods: offer.goods,
  location: offer.location
});

export const adaptCommentToServer = (comment: NewComment): CreateCommentDto => ({
  comment: comment.comment,
  date: new Date().toISOString(),
  rating: comment.rating,
});
