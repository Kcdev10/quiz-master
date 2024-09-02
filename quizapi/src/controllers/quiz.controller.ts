import { Request, Response } from 'express';
import asyncHandler from '../utils/asyncHandler';
import httpResponse from '../utils/httpRespone';
import axios from 'axios';

// # Reterving quiz question from https://opentdb.com/api
export const getQuizQuestionController = asyncHandler(
  async (req: Request, res: Response) => {
    const { amount, category, difficulty, type } = req.query;
    const { data } = await axios.get(
      `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`
    );

    const responseMessage = 'Questions retrieved successfully';

    httpResponse(req, res, 200, responseMessage, data);
  }
);
