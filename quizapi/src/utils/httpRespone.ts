import { Request, Response } from 'express';
import { THttpResponse } from '../types/types';

const httpResponse = (
  req: Request,
  res: Response,
  statusCode: number,
  message: string,
  data: unknown = null,
  cookies: Record<string, unknown> | null = null
) => {
  // #create a response object
  const response: THttpResponse = {
    success: true,
    statusCode: statusCode,
    request: {
      ip: req.ip,
      method: req.method,
      url: req.originalUrl,
    },
    message: message,
    data: data,
  };

  if (cookies) {
    res
      .status(statusCode)
      .cookie(cookies.cookieName as string, cookies.cookieValue)
      .json(response);
  } else {
    res.status(statusCode).json(response);
  }
};

export default httpResponse;
