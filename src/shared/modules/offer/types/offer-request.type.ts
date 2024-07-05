import {Request} from 'express';
import {ParamsDictionary, Query} from 'express-serve-static-core';

import {ResponseBody} from '../../../libs/rest/index.js';
import {CreateOfferDto} from '../dto/create-offer.dto.js';
import {UpdateOfferDto} from '../dto/update-offer.dto.js';

export type RequestQuery = {
  count?: string;
  city: string;
  status: string;
} | Query;

export type RequestParams = {
  offerId: string;
} | ParamsDictionary;

export type OfferRequest = Request<RequestParams, ResponseBody, CreateOfferDto, RequestQuery>;

export type UpdateOfferRequest = Request<RequestParams, ResponseBody, UpdateOfferDto, RequestQuery>;
