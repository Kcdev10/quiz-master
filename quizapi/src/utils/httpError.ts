import { NextFunction, Request } from 'express';
import { THttpError } from '../types/types';

const httpError = (
  next: NextFunction,
  error: Error,
  req: Request,
  statusCode: number
) => {
  // #create a error object
  const errorObject: THttpError = {
    success: false, 
    statusCode: statusCode,
    request: {
      ip: req.ip,
      method: req.method,
      url: req.originalUrl,
    },
    message: error instanceof Error ? error.message : 'Something went wrong',
    data: null,
    trace: error instanceof Error ? { error: error.stack } : null,
  };

  return next(errorObject); 
};

export default httpError;
