//Handles async errors for Express
//Takes an async function and catches the error and forwards it to next(error) (express way of handling errors)

import type { NextFunction, Request, RequestHandler, Response } from 'express';

type ErrorForwarder = (error: Error) => void;

export type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<unknown>;

const toError = (error: unknown): Error => {
  return error instanceof Error ? error : new Error(String(error));
};

const forwardError = (nextFn: ErrorForwarder, error: unknown) => {
  nextFn(toError(error));
};

export const asyncHandler = (handler: AsyncHandler): RequestHandler => {
  return (req, res, next) => {
    void handler(req, res, next).catch((error: unknown) => {
      forwardError(next as ErrorForwarder, error);
    });
  };
};
