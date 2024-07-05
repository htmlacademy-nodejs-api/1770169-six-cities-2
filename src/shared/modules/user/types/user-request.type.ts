import {Request} from 'express';
import {ParamsDictionary} from 'express-serve-static-core';

import {RequestBody, ResponseBody} from '../../../libs/rest/index.js';
import {CreateUserDto} from '../dto/create-user.dto.js';
import {AuthUserDto} from '../dto/auth-user.dto.js';

export type RequestParams = {
  userId: string;
} | ParamsDictionary;

export type UserRequest = Request<RequestParams, ResponseBody, CreateUserDto>;

export type AuthUserRequest = Request<RequestBody, ResponseBody, AuthUserDto>;
