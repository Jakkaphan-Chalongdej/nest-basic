import { NextFunction, Request, Response } from 'express';
import * as auth from 'basic-auth';
import * as compare from 'tsscmp';

export const basicMiddleware = (username: string, password: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const credentials = auth(req);

    if (
      !credentials ||
      !check(credentials.name, credentials.pass, username, password)
    ) {
      res.statusCode = 401;
      res.setHeader('WWW-Authenticate', 'Basic realm="example"');
      res.end('Access denied');
    } else {
      return next();
    }
  };
};

const check = (username, pass, auth_username, auth_pass) => {
  let valid = true;

  valid = compare(username, auth_username) && valid;
  valid = compare(pass, auth_pass) && valid;

  return valid;
};
