import convict from 'convict';
import validators from 'convict-format-with-validator';

convict.addFormats(validators);

export type RestSchema = {
  PORT: string;
  SALT: string;
  DB_HOST: string;
  DB_USER_NAME: string;
  DB_USER_PASSWORD: string;
  DB_PORT: string;
  DB_NAME: string;
  UPLOAD_DIRECTORY: string;
  JWT_SECRET: string;
  HOST: string;
  STATIC_DIRECTORY: string;
}

export const configRestSchema = convict<RestSchema>({
  PORT: {
    doc: 'Port for incoming connections.',
    format: 'port',
    env: 'PORT',
    default: '4000'
  },
  SALT: {
    doc: 'Salt for password hash.',
    format: String,
    env: 'SALT',
    default: null
  },
  DB_HOST: {
    doc: 'IP address of the database.',
    format: 'ipaddress',
    env: 'DB_HOST',
    default: '127.0.0.1'
  },
  DB_USER_NAME: {
    doc: 'Username to connect to the database.',
    format: String,
    env: 'DB_USER_NAME',
    default: null
  },
  DB_USER_PASSWORD: {
    doc: 'Password to connect to the database.',
    format: String,
    env: 'DB_USER_PASSWORD',
    default: null
  },
  DB_PORT: {
    doc: 'Port to connect to the database.',
    format: 'port',
    env: 'DB_PORT',
    default: '27017'
  },
  DB_NAME: {
    doc: 'Database name',
    format: String,
    env: 'DB_NAME',
    default: null
  },
  UPLOAD_DIRECTORY: {
    doc: 'Upload files directory',
    format: String,
    env: 'UPLOAD_DIRECTORY',
    default: null
  },
  JWT_SECRET: {
    doc: 'Secret key to JWT token',
    format: String,
    env: 'JWT_SECRET',
    default: null
  },
  HOST: {
    doc: 'Server startup host',
    format: String,
    env: 'HOST',
    default: 'localhost'
  },
  STATIC_DIRECTORY: {
    doc: '',
    format: String,
    env: 'STATIC_DIRECTORY',
    default: 'static'
  }
});
