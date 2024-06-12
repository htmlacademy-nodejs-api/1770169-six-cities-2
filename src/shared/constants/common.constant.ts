export const RADIX = 10;

export const JSON_SERVER_URL = 'http://localhost:3010';

export const ENCODING = 'utf8';

export const MODULES_PATH = './cli/commands';

export const FILE_END_SUFFIXES = 'command.ts';

export const COMMAND_PREFIX = '--';

export const DEFAULT_PASSWORD = '88888888';

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

export const ProcessMessage = {
  REST_APP_INIT_MESSAGE: 'Rest application has been initialized on port: ',
  ENV_READ_MESSAGE: '.env file read successfully.'
};

export const ErrorMessage = {
  ENV_READ_MESSAGE: 'Can\'t read .env file.'
};
