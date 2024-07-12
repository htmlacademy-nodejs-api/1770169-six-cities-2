import {inject, injectable} from 'inversify';

import {StatusCodes} from 'http-status-codes';

import {SignJWT} from 'jose';

import {createSecretKey} from 'node:crypto';

import {Component, ENCODING} from './../../constants/index.js';
import {DefaultUserService, UserEntity} from '../user/index.js';
import {AuthService} from './auth-service.interface.js';
import {LoginUserDto} from './dto/login-user.dto.js';
import {Logger} from '../../libs/logger/index.js';
import {TokenPayload} from './types/token-payload.type.js';
import {CRYPTO_ALGORITHM, ErrorMessage, EXPIRED_TIME, InfoMessage} from './auth.constant.js';
import {Config, RestSchema} from '../../libs/config/index.js';
import {createMessage} from './../../helpers/index.js';
import {HttpError} from '../../libs/rest/index.js';

@injectable()
export class DefaultAuthService implements AuthService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.UserService) private readonly userService: DefaultUserService,
    @inject(Component.Config) private readonly config: Config<RestSchema>,
  ) {}

  public async authenticate(user: UserEntity): Promise<string> {
    const secretKey = createSecretKey(this.config.get('JWT_SECRET'), ENCODING);
    this.logger.info(createMessage(InfoMessage.CREATE_CITY_MESSAGE, [user.email]));
    const payload: TokenPayload = {
      id: user.id,
      email: user.email
    };

    return new SignJWT(payload)
      .setProtectedHeader({alg: CRYPTO_ALGORITHM})
      .setIssuedAt()
      .setExpirationTime(EXPIRED_TIME)
      .sign(secretKey);
  }

  public async verify(dto: LoginUserDto): Promise<UserEntity> {
    const existsUser = await this.userService.findByEmail(dto.email);

    if(!existsUser) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        createMessage(ErrorMessage.NO_FOUND_MESSAGE, [dto.email])
      );
    }

    if(!existsUser.verifyPassword(dto.password, this.config.get('SALT'))) {
      throw new HttpError(
        StatusCodes.UNAUTHORIZED,
        ErrorMessage.INCORRECT_MESSAGE
      );
    }

    return existsUser;
  }
}
