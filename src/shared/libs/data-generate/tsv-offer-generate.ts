import {
  getRandomDate,
  getRandomElementFromArray,
  getRandomElementsFromArray,
  getRandomEmail,
  getRandomNumber
} from '../../helpers/index.js';
import {MockServerDataType} from '../../types/index.js';
import {DataGenerate} from './data-generate.interface.js';
import {CITY, Separator} from '../../constants/index.js';
import {
  Bedroom,
  Comment,
  Date,
  Guest,
  MAX_IMAGE_VIEW,
  NumericValue,
  Price,
  Rating
} from './data-generate.constant.js';

export class TsvOfferGenerate implements DataGenerate {
  constructor(
    private readonly mockData: MockServerDataType
  ) {}

  public generate(): string {
    const title = getRandomElementFromArray(this.mockData.titles);
    const description = getRandomElementFromArray(this.mockData.descriptions);
    const date = getRandomDate(Date.FROM, Date.TO);
    const city = getRandomElementFromArray(this.mockData.cities);
    const cityLatitude = CITY[city].latitude;
    const cityLongitude = CITY[city].longitude;
    const previewImage = getRandomElementFromArray(this.mockData.images);
    const images = getRandomElementsFromArray(this.mockData.images, MAX_IMAGE_VIEW).join(Separator.ENUMERATION_SEPARATOR);
    const isPremium = !!getRandomNumber(NumericValue.FALSE, NumericValue.TRUE);
    const isFavorite = !!getRandomNumber(NumericValue.FALSE, NumericValue.TRUE);
    const rating = getRandomNumber(Rating.MIN, Rating.MAX, 1);
    const type = getRandomElementFromArray(this.mockData.types);
    const bedrooms = getRandomNumber(Bedroom.MIN, Bedroom.MAX);
    const maxGuests = getRandomNumber(Guest.MIN, Guest.MAX);
    const price = getRandomNumber(Price.MIN, Price.MAX);
    const goods = getRandomElementsFromArray(this.mockData.goods).join(Separator.ENUMERATION_SEPARATOR);
    const userName = getRandomElementFromArray(this.mockData.names);
    const email = getRandomEmail();
    const avatar = getRandomElementFromArray(this.mockData.avatars);
    const isPro = !!getRandomNumber(NumericValue.FALSE, NumericValue.TRUE);
    const comments = getRandomNumber(Comment.MIN, Comment.MAX);
    const [lat, lng] = getRandomElementFromArray(this.mockData.coordinates[city]);
    const latitude = lat;
    const longitude = lng;

    return [
      title,
      description,
      date,
      city,
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
      isPro,
      comments,
      latitude,
      longitude
    ].join(Separator.VALUE_SEPARATOR);
  }
}
