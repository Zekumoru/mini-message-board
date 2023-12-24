import { NextFunction, Request, Response } from 'express';

const bodyMiddleware = <T extends object>(cb: (body: T) => void) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    cb(req.body);
    next();
  };
};

export default bodyMiddleware;
