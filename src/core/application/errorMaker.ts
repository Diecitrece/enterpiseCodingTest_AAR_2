type ErrorMaker = (name: string, message: string) => void;
export const errorMaker: ErrorMaker = (name: string, message: string): void => {
  throw { name, message } as Error;
};
