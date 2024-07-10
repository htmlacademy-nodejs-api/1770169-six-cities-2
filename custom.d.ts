import {TokenPayload} from './src/shared/modules/auth/index.ts';

declare module 'express-serve-static-core' {
  export interface Request {
    locals: TokenPayload;
  }
}
