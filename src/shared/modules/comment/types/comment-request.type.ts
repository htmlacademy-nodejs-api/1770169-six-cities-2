import {Request} from 'express';
import {ParamsDictionary} from 'express-serve-static-core';

import {ResponseBody} from '../../../libs/rest/index.js';
import {CreateCommentDto} from '../index.js';

export type RequestParams = {
  offerId: string;
} | ParamsDictionary;

export type CommentRequest = Request<RequestParams, ResponseBody, CreateCommentDto>;
