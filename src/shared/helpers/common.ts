export const getRandomNumber = (min: number, max: number): number => Math.floor(Math.random() * (max - min) + min);

export const getRandomElementFromArray = <T>(elements: T[]): T => elements[getRandomNumber(0, elements.length - 1)];

export const getRandomElementsFromArray = <T>(elements: T[], count: number): T[] => {
  const newElements = new Set<T>();

  while (newElements.size !== count) {
    newElements.add(elements[getRandomNumber(0, elements.length - 1)]);
  }

  return [...newElements];
};
