import jwt from 'jsonwebtoken';
import Sequelize from 'sequelize';
import { captureException } from '@sentry/node';
import { NextFunction, Response } from 'express';
import { validationResult } from 'express-validator';

import { AppError, CreateErr, User, AuthenticatedRequest } from '../../types';

export const createError: CreateErr = (message, code = 403, validations = null) => {
  const err = new Error(message);
  // @ts-ignore
  err.code = code;
  // @ts-ignore
  err.validations = validations;
  return err;
};

export const success = (msg: string, data: any, meta?: object) => ({
  data,
  status: true,
  message: msg,
  ...(meta && { meta }),
});

export async function Authenticate(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    if (req.user) {
      return next();
    }

    const authHeader = req.get('Authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      throw createError('Authorization Header not provided!', 403);
    }

    // @ts-ignore
    const user: User = jwt.verify(token, process.env.AUTH_SECRET);
    req.user = user;
    return next();
  } catch (e) {
    return next(e);
  }
}

export function errorHandler(error: AppError, req: any, res: Response, _next: any) {
  try {
    if (error.validations) {
      return res.status(422).json({
        status: false,
        message: 'All fields are required',
        data: error.validations,
      });
    }

    let code = error.code || 500;
    let msg = error.message;

    if (!code) {
      if (error instanceof Sequelize.ValidationError) {
        code = 422;
      } else if (error instanceof Sequelize.EmptyResultError) {
        code = 404;
        msg = 'The resource requested was not found';
      } else {
        code = 500;
        msg = error.message || 'Exception 500! Operation failed.';
      }
    }

    console.log(error.name || 'Error', error.message);

    captureException(error);
    req.transaction.finish();
    return res.status(code || 500).json({ status: false, message: msg });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ status: false });
  }
}

export const forwardRequest = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const { app } = req;
  // eslint-disable-next-line no-underscore-dangle
  return app._router.handle(req, res, next);
};

export const validate = (req: AuthenticatedRequest, _res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      return next();
    }

    const extractedErrors = [];
    errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

    throw createError('Validation failed', 400, extractedErrors);
  } catch (e) {
    return next(e);
  }
};
