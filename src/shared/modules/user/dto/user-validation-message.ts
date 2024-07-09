export const UserValidationMessage = {
  name: {
    invalidFormat: 'Name must be an string',
    minLength: 'Minimum name length must be 1',
    maxLength: 'Maximum name length must be 15',
  },
  email: {
    invalidFormat: 'Email must be a valid address'
  },
  avatar: {
    invalidFormat: 'Avatar must be an string',
    invalid: 'The image format should be .jpg or .png'
  },
  password: {
    invalidFormat: 'Password is required',
    lengthField: 'Length for password min is 6, max is 12'
  },
  userType: {
    invalid: 'User type must be regular and pro'
  }
} as const;
