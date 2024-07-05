export const InfoMessage = {
  ROUTE_REGISTERED_MESSAGE: 'Route registered: %method% %path%'
};

export const ErrorMessage = {
  VALIDATE_OBJECT_ID_MESSAGE: '%objectId% is invalid ObjectID',
  CITY_NOT_FOUND_MESSAGE: '%entity% with %params% not found in the database.'
};

export enum Detail {
  ValidateOjectIdMiddleware = 'ValidateOjectIdMiddleware',
  DocumentExistsMiddleware = 'DocumentExistsMiddleware'
}
