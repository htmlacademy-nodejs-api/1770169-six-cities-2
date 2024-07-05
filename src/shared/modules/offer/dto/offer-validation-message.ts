export const OfferValidationMessage = {
  title: {
    invalidFormat: 'Title must be an string',
    minLength: 'Minimum title length must be 10',
    maxLength: 'Maximum title length must be 100',
  },
  description: {
    invalidFormat: 'Description must be an string',
    minLength: 'Minimum description length must be 20',
    maxLength: 'Maximum description length must be 1024',
  },
  date: {
    invalidFormat: 'Date must be a valid ISO date',
  },
  city: {
    invalid: 'Name must be Paris, Cologne, Brussels, Amsterdam, Hamburg and Dusseldorf',
  },
  previewImage: {
    invalidFormat: 'Preview image must be an string',
  },
  images: {
    invalidFormat: 'Images must be an array',
    size: 'There should be 6 photos',
  },
  isPremium: {
    invalidFormat: 'Is premium must be boolean',
  },
  isFavorite: {
    invalidFormat: 'Is favorite must be boolean',
  },
  type: {
    invalid: 'Type must be apartment, house, room and hotel'
  },
  bedrooms: {
    invalidFormat: 'Bedrooms must be an integer',
    minValue: 'Minimum bedrooms is 1',
    maxValue: 'Maximum bedrooms is 8',
  },
  guests: {
    invalidFormat: 'Guests must be an integer',
    minValue: 'Minimum guests is 1',
    maxValue: 'Maximum guests is 10',
  },
  price: {
    invalidFormat: 'Price must be an integer',
    minValue: 'Minimum price is 100',
    maxValue: 'Maximum price is 100000',
  },
  goods: {
    invalidFormat: 'Goods must be an array',
    minSize: 'At least one goods',
    invalid: 'Goods must be one or more Breakfast, Air conditioning, Laptop friendly workspace, Baby seat, Washer, Towels and Fridge'
  },
  location: {
    invalidFormat: 'Location must be an object',
  }
} as const;
