import { THttpError } from '../types/types';
import { NextFunction, Request, Response } from 'express';
import CustomErrorHandler from '../utils/customErrorHandler';

const errorHanlder = (
  error: THttpError,
  req: Request,
  res: Response,
  _: NextFunction
) => {
  // Check if the error is an instance of CustomErrorHandler
  if (error instanceof CustomErrorHandler) {
    return res.status(500).json({
      success: false,
      statusCode: error.statusCode,
      request: {
        method: req.method,
        url: req.originalUrl,
      },
      message: error.message,
      data: null,
      trace: { error },
    });
  }

  return res.status(error.statusCode).json(error);
};

export default errorHanlder;
