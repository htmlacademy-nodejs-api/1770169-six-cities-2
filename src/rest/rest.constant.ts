export const InfoMessage = {
  REST_APP_INIT_MESSAGE: 'Initializing the application...',
  DATABASE_INIT_MESSAGE: 'Initializing the database...',
  DATABASE_INIT_COMPLETED_MESSAGE: 'The database is initialized.',
  MIDDLEWARES_INIT_MESSAGE: 'Initializing the middlewares...',
  MIDDLEWARES_INIT_COMPLETED_MESSAGE: 'The middlewares is initialized.',
  EXCEPTIONS_INIT_MESSAGE: 'Initializing the exception filters...',
  EXCEPTIONS_INIT_COMPLETED_MESSAGE: 'The exception filters is initialized.',
  CONTROLLERS_INIT_MESSAGE: 'Initializing the controllers...',
  CONTROLLERS_INIT_COMPLETED_MESSAGE: 'The controllers is initialized.',
  SERVER_INIT_MESSAGE: 'Initializing the server...',
  SERVER_INIT_COMPLETED_MESSAGE: 'The server is initialized, server running at: %host%.'
};

export enum Directory {
  Upload = '/upload',
  Static = '/static'
}

export enum BaseRout {
  Offers = '/six-cities/offers',
  Favorites = '/six-cities/favorites',
  Premium = '/six-cities/premium',
  User = '/six-cities/user'
}
