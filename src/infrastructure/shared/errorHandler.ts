import { Request, Response, NextFunction } from 'express';
export interface Error {
  name: string;
  message: string;
}
export const HttpErrorHandler = (
  error: Error | string,
  req: Request,
  res: Response,
  next: NextFunction
): undefined => {
  if (typeof error === 'string') {
    res.status(500).send(`Internal error: ${error}`);
    return;
  }
  const { name, message } = error;
  const types = [
    {
      name: 'notFound',
      code: 404,
      message: 'Not found',
    },
    {
      name: 'alreadyExists',
      code: 400,
      message: 'Already  exists',
    },
    {
      name: 'incomplete',
      code: 400,
      message: 'Fields missing',
    },
  ];
  const errorType = types.find((type) => type.name === name) || {
    code: 500,
    message: `Internal error`,
  };
  res.status(errorType.code).send(message ? message : errorType.message);
  return;
};
