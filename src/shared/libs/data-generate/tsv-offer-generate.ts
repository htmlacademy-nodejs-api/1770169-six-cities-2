import {
  generatePassword,
  getRandomDate,
  getRandomElementFromArray,
  getRandomElementsFromArray,
  getRandomNumber
} from '../../helpers/index.js';
import {MockServerDataType} from '../../types/index.js';
import {DataGenerate} from './data-generate.interface.js';
import {
  Bedroom,
  CITY,
  Comment,
  Date,
  Guest,
  NumericValue,
  Price,
  Rating
} from '../../constants/index.js';

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
    const images = getRandomElementsFromArray(this.mockData.images, 6).join(';');
    const isPremium = !!getRandomNumber(NumericValue.FALSE, NumericValue.TRUE);
    const isFavorite = !!getRandomNumber(NumericValue.FALSE, NumericValue.TRUE);
    const rating = getRandomNumber(Rating.MIN, Rating.MAX, 1);
    const type = getRandomElementFromArray(this.mockData.types);
    const bedrooms = getRandomNumber(Bedroom.MIN, Bedroom.MAX);
    const maxGuests = getRandomNumber(Guest.MIN, Guest.MAX);
    const price = getRandomNumber(Price.MIN, Price.MAX);
    const goods = getRandomElementsFromArray(this.mockData.goods).join(';');
    const userName = getRandomElementFromArray(this.mockData.names);
    const email = getRandomElementFromArray(this.mockData.emails);
    const avatar = getRandomElementFromArray(this.mockData.avatars);
    const password = generatePassword();
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
      password,
      isPro,
      comments,
      latitude,
      longitude
    ].join('\t');
  }
}
