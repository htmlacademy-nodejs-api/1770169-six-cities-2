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
  Price
} from './data-generate.constant.js';
import {UserType} from '../../types/user-type.enum.js';

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
    const images = getRandomElementsFromArray(this.mockData.images, MAX_IMAGE_VIEW).join(Separator.Enumeration);
    const isPremium = !!getRandomNumber(NumericValue.False, NumericValue.True);
    const isFavorite = !!getRandomNumber(NumericValue.False, NumericValue.True);
    const type = getRandomElementFromArray(this.mockData.types);
    const bedrooms = getRandomNumber(Bedroom.MIN, Bedroom.MAX);
    const guests = getRandomNumber(Guest.MIN, Guest.MAX);
    const price = getRandomNumber(Price.MIN, Price.MAX);
    const goods = getRandomElementsFromArray(this.mockData.goods).join(Separator.Enumeration);
    const userName = getRandomElementFromArray(this.mockData.names);
    const email = getRandomEmail();
    const avatar = getRandomElementFromArray(this.mockData.avatars);
    const userType = getRandomElementFromArray(Object.values(UserType));
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
      longitude
    ].join(Separator.Value);
  }
}
