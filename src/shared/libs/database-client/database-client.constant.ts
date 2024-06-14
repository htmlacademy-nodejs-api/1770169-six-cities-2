export enum Retry {
  Count = 5,
  Timeout = 1000
}

export const InfoMessage = {
  TRYING_CONNECT_MESSAGE: 'Trying to connect to database…',
  CONNECT_MESSAGE: 'Database connection established.',
  DISCONNECT_MESSAGE: 'Database connection closed.'
};

export const ErrorMessage = {
  ALREADY_CONNECTED_MESSAGE: 'Database already connected.',
  CONNECTION_ATTEMPT_MESSAGE: 'Failed to connect to the database. Attempt: %attempt%.',
  FAILED_CONNECT_MESSAGE: 'Unable to establish database connection after: %retryCount%.',
  NOT_CONNECTED_MESSAGE: 'The database was not connected.'
};
