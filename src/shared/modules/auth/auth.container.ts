import {Container} from 'inversify';

import {Component} from '../../constants/index.js';
import {DefaultAuthService } from './default-auth.service.js';
import {AuthService} from './auth-service.interface.js';

export function createAuthContainer() {
  const container = new Container();
  container.bind<AuthService>(Component.AuthService).to(DefaultAuthService).inSingletonScope();

  return container;
}
