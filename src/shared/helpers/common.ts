import dayjs from 'dayjs';
import {CHARSET, Separator} from '../constants/common.constant.js';

export const getRandomNumber = (min: number, max: number, numAfterDigit = 0): number => +(Math.random() * (max - min) + min).toFixed(numAfterDigit);

export const getRandomElementFromArray = <T>(elements: T[]): T => elements[getRandomNumber(0, elements.length - 1)];

export const getRandomElementsFromArray = <T>(elements: T[], count = getRandomNumber(0, elements.length - 1)): T[] => {
  if (count >= elements.length) {
    return elements;
  }

  const newElements = new Set<T>();

  while (newElements.size !== count) {
    newElements.add(elements[getRandomNumber(0, elements.length - 1)]);
  }

  return [...newElements];
};

export const getRandomDate = (fromDate: string, toDate: string): string => {
  const fromDateToMillisecond = dayjs(fromDate).valueOf();
  const toDateToMillisecond = dayjs(toDate).valueOf();
  return dayjs(getRandomNumber(fromDateToMillisecond, toDateToMillisecond)).toISOString();
};

export const generatePassword = (passwordLength = 6): string => Array
  .from({length: passwordLength}, () => CHARSET[getRandomNumber(0, CHARSET.length)]).join(Separator.ENUMERATION_SEPARATOR);

export const getErrorMessage = (error: unknown): string => error instanceof Error ? error.message : '';
