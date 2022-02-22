import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../errors';

/**
 * Custom middleware to handle any route error
 */
export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  console.error('An unexpected error occured:', err);
  res.status(500).send({ errors: [{ message: 'Ocurrió un error inesperado de nuestra parte' }] });
};
