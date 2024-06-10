export const RADIX = 10;

export const JSON_SERVER_URL = 'http://localhost:3010';

export const ENCODING = 'utf8';

export const MODULES_PATH = './cli/commands';

export const FILE_END_SUFFIXES = 'command.js';

export const COMMAND_PREFIX = '--';

export const CHARSET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

export const Separator = {
  VALUE_SEPARATOR: '\t',
  LINE_SEPARATOR: '\n',
  ENUMERATION_SEPARATOR: ';',
  EMPTY_SEPARATOR: ''
};

export const CITY = {
  Paris: {
    latitude: 48.85661,
    longitude: 2.351499
  },
  Cologne: {
    latitude: 50.938361,
    longitude: 6.959974
  },
  Brussels: {
    latitude: 50.846557,
    longitude: 4.351697
  },
  Amsterdam: {
    latitude: 52.370216,
    longitude: 4.895168
  },
  Hamburg: {
    latitude: 53.550341,
    longitude: 10.000654
  },
  Dusseldorf: {
    latitude: 51.225402,
    longitude: 6.776314
  }
};

export enum Housing {
  apartment = 'apartment',
  house = 'house',
  room = 'room',
  hotel = 'hotel'
}

export enum Facilities {
  'Breakfast' = 'breakfast',
  'Air Conditioning' = 'air conditioning',
  'Laptop friendly workspace'= 'laptop friendly workspace',
  'BabySeat' = 'baby seat',
  'Washer' = 'washer',
  'Towels' = 'towels',
  'Fridge' = 'fridge'
}

export const ProccesMessage = {
  REST_APP_INIT_MESSAGE: 'Rest application has been initialized on port: ',
  ENV_READ_MESSAGE: '.env file read successfully.'
};

export const ErrorMessga = {
  ENV_READ_MESSAGE: 'Can\'t read .env file.'
};
