import { Request, Response, NextFunction } from 'express';
import httpError from './httpError';

/**
 * Middleware to handle asynchronous route handlers and pass errors to Express error handlers.
 *
 * @param asyncHandlerFunction - The asynchronous function to be wrapped and executed.
 * @returns A function that executes the asyncHandlerFunction and handles errors using either
 * Promise.resolve().catch() or try-catch.
 */
const asyncHandler = (
  asyncHandlerFunction: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await asyncHandlerFunction(req, res, next);
    } catch (error) {
      if(error instanceof Error) 
        httpError(next, error, req, 500);
    }
  };
};

export default asyncHandler;
