import cors from 'cors';
import path from 'path';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import userRouter from './router/user.router';
import quizRouter from './router/quiz.router';
import asyncHandler from './utils/asyncHandler';
import errorHanlder from './middlewares/errorHandler';

import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';

const app: Application = express();

// Middlewares

app.use(
  cors({
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(morgan('tiny'));
app.use(helmet());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Routes Middlewares
app.use('/api/v1/auth', userRouter);
app.use('/api/v1/quiz', quizRouter);

// send inital response about the project...
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to the Node.js wit TypeScript Boilerplate!',
    description:
      'This boilerplate provides a solid foundation for building scalable and maintainable Node.js applications with TypeScript. It includes setup for TypeScript, ESLint, Prettier, and more.',
    features: [
      'TypeScript for static typing and enhanced code quality',
      'Pre-configured ESLint and Prettier for code linting and formatting',
      'Express.js for building robust APIs',
      'Husky and lint-staged for pre-commit hooks and code quality enforcement',
      'Error handling and logging setup',
      'Ready-to-use project structure for rapid development',
    ],
    nextSteps: [
      'Clone the repository and install dependencies',
      'Start developing your application by adding routes and features',
      'Customize the configuration to suit your project needs',
    ],
  });
});

//404 Not Found Routes Middlewares
app.use(
  asyncHandler((_req: Request, __res: Response) => {
    throw new Error('404 route not found');
  })
);

// Global Error Handler
app.use(errorHanlder);

export default app;
