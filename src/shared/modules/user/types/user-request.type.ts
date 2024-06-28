import {Request} from 'express';

import {RequestBody, ResponseBody} from '../../../libs/rest/index.js';
import {CreateUserDto} from '../dto/create-user.dto.js';
import {AuthUserDto} from '../dto/auth-user.dto.js';


export type UserRequest = Request<RequestBody, ResponseBody, CreateUserDto>;

export type AuthUserRequest = Request<RequestBody, ResponseBody, AuthUserDto>;
