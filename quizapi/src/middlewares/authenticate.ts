import { NextFunction, Request, Response } from 'express';
import CustomErrorHandler from '../utils/customErrorHandler';
import jwt from 'jsonwebtoken';
// import User from '../models/user.model';
import asyncHandler from '../utils/asyncHandler';
import config from '../config/config';

declare module 'express-serve-static-core' {
  interface Request {
    user?: unknown; // Replace 'any' with the specific type if known, e.g., `User`
  }
}

export const isAuthenticateOrNot = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req?.cookies?.auth_user_access_token;

    if (!accessToken) {
      return next(new CustomErrorHandler('user is not authenticated', 401));
    }
    const user = await jwt.verify(accessToken, config.JWT_SECRET as string);
    req.user = user;
    next();
  }
);
