import {readFileSync} from 'node:fs';
import {FileReaderInterface} from './file-reader.interface.js';
import {Offer} from '../../types/offer.type.js';
import {ErrorMessage, RADIX} from './file-reader.constant.js';

export default class TsvFileReader implements FileReaderInterface {
  private rawData = '';

  constructor(
    private filename: string
  ) {}

  public read(): void {
    this.rawData = readFileSync(this.filename, {encoding: 'utf-8'});
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      throw new Error(ErrorMessage.READ_FILE_ERROR);
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split('\t'))
      .map(([
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
        maxAdults,
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
      ]) => ({
        title,
        description,
        date: new Date(date),
        city: {
          name: cityName,
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
        maxAdults: Number.parseInt(maxAdults, RADIX),
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
      }));
  }
}
