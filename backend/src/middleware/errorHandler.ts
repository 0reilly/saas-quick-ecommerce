import { Request, Response, NextFunction } from 'express';
import { HttpError } from '../types/httpError';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof HttpError) {
    console.error(`[${err.statusCode}] ${err.message}`);
    return res.status(err.statusCode).json({ message: err.message });
  } else {
    console.error(err.stack);
    return res.status(500).json({ message: 'Internal server error' });
  }
};