export const DEFAULT_USER_AVATAR = 'default-avatar.png';
export const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i;
export const AVATAR_EXTENSION_REGEX = /([^\s]+(\.(jpg|png))$)/;
export const COLLECTION_NAME = 'user';

export const Password = {
  MIN: 6,
  MAX: 100
};

export const UserName = {
  MIN: 1,
  MAX: 15
};

export const InfoMessage = {
  CREATE_USER_MESSAGE: 'The user with this email: \'%email%\' has been successfully registered.',
};

export const ErrorMessage = {
  CREATE_USER_MESSAGE: 'The user with this email \'%email%\' has already been registered.',
};
