export const DEFAULT_USER_AVATAR = 'default-avatar.png';
export const AVATAR_EXTENSION_REGEX = /([^\s]+(\.(jpg|png))$)/;
export const COLLECTION_NAME = 'user';
export const DETAIL = 'UserController';

export enum Password {
  Min = 6,
  Max = 100
}

export enum UserName {
  Min = 1,
  Max = 15
}

export enum Route {
  Registration = '/sign-up',
  Authentication = '/sign-in',
  Logout = '/sign-out',
  Upload = '/:userId/upload'
}

export const InfoMessage = {
  CREATE_USER_MESSAGE: 'The user with this email: \'%email%\' has been successfully registered.',
  REGISTER_ROUTES_MESSAGE: 'Register routes for UserController.'
};

export const ErrorMessage = {
  CREATE_USER_MESSAGE: 'The user with this email: \'%email%\' has already been registered.',
  UNAUTHORIZED_MESSAGE: 'Unauthorized'
};
