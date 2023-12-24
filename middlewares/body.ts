import { NextFunction, Request, Response } from 'express';

const bodyMiddleware = <T extends object>(cb: (body: T) => T) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    req.body = cb(req.body);
    next();
  };
};

export default bodyMiddleware;
