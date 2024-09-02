import { NextFunction, Request, Response } from 'express';
import asyncHandler from '../utils/asyncHandler';
import User from '../models/user.model';
import CustomErrorHandler from '../utils/customErrorHandler';
import httpResponse from '../utils/httpRespone';

export const isAuthenticatedUser = (req: Request, res: Response) => {
  httpResponse(req, res, 201, 'user is authenticate', { ...req.user! });
};

export const loginController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, password } = req.body;
    const isUser = await User.findOne({ email });

    if (!isUser) {
      return next(new CustomErrorHandler('user not found', 401));
    }

    if (password) {
      const isMatch = await isUser.comparePassword(password);
      if (!isMatch) {
        return next(
          new CustomErrorHandler('username or password incorrect', 401)
        );
      }
    } else {
      return next(new CustomErrorHandler('password is required', 401));
    }

    const accessToken = await isUser.generateToken();

    const cookieData = {
      cookieName: 'auth_user_access_token',
      cookieValue: accessToken,
    };

    httpResponse(
      req,
      res,
      201,
      'login successfull',
      {
        accessToken,
        uuid: isUser._id,
      },
      cookieData
    );
  }
);

export const registerController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { username, email, password } = req.body;
    const isUserExist = await User.findOne({ email });

    if (isUserExist) {
      return next(new CustomErrorHandler('user already register', 401));
    }

    await User.create({
      username,
      email,
      password,
    });

    httpResponse(req, res, 200, 'register successfull');
  }
);
