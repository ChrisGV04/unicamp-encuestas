import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { RequestValidationError } from '../errors';

/**
 * Custom middleware that checks if there where any express-validator errors
 */
export const validateRequest = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) throw new RequestValidationError(errors.array());
  next();
};
