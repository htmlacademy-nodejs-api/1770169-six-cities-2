import dayjs from 'dayjs';

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

export const generatePassword = (passwordLength = 6): string => {
  const charset = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  return Array.from({length: passwordLength}, () => charset[getRandomNumber(0, charset.length)]).join('');
};

export function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : '';
}
