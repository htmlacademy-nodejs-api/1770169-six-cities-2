export const InfoMessage = {
  ROUTE_REGISTERED_MESSAGE: 'Route registered: %method% %path%'
};

export const ErrorMessage = {
  VALIDATE_OBJECT_ID_MESSAGE: '%objectId% is invalid ObjectID',
  CITY_NOT_FOUND_MESSAGE: '%entity% with %params% not found in the database.',
  INVALID_TOKEN_MESSAGE: 'Invalid token',
  UNAUTHORIZED_MESSAGE: 'Unauthorized',
  VALIDATE_ERROR_MESSAGE: 'Validation error: %path%',
  OWNERSHIP_ERROR_MESSAGE: 'You are not the owner of this %value%'
};

export enum Detail {
  ValidateOjectIdMiddleware = 'ValidateOjectIdMiddleware',
  DocumentExistsMiddleware = 'DocumentExistsMiddleware',
  ParseTokenMiddleware = 'ParseTokenMiddleware',
  PrivateRouteMiddleware = 'PrivateRouteMiddleware',
  VerificationOwnershipMiddleware = 'VerificationOwnershipMiddleware'
}
