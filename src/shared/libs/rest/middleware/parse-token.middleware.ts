import {Request, Response, NextFunction} from 'express';

import {jwtVerify} from 'jose';

import {StatusCodes} from 'http-status-codes';

import {createSecretKey} from 'node:crypto';

import {Middleware} from './middleware.interface.js';
import {ENCODING} from '../../../constants/index.js';
import {HttpError} from '../errors/http-error.js';
import {TokenPayload} from '../../../modules/auth/index.js';
import {Detail, ErrorMessage} from '../rest.constant.js';

function isTokenPayload(payload: unknown): payload is TokenPayload {
  return (
    (typeof payload === 'object' && payload !== null) &&
    ('id' in payload && typeof payload.id === 'string') &&
    ('email' in payload && typeof payload.email === 'string')
  );
}

export class ParseTokenMiddleware implements Middleware {
  constructor(private readonly jwtSecret: string) {}

  public async execute(req: Request, _res: Response, next: NextFunction): Promise<void> {
    const authorization = req.headers['authorization'];

    if (!authorization) {
      return next();
    }

    const [, token] = authorization.split(' ');

    try {
      const {payload} = await jwtVerify(token, createSecretKey(this.jwtSecret, ENCODING));

      if (isTokenPayload(payload)) {
        req.locals = payload;
        return next();
      } else {
        throw new Error();
      }
    } catch (error) {
      return next(new HttpError(
        StatusCodes.UNAUTHORIZED,
        ErrorMessage.INVALID_TOKEN_MESSAGE,
        Detail.ParseTokenMiddleware)
      );
    }
  }
}
