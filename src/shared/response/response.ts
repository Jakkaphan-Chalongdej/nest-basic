import { Response } from 'express';

interface respInterface {
  code: number;
  status: string;
  result?: any[];
  message?: string;
}

export enum respStatus {
  SUCCESS = 'success',
  FAIL = 'fail',
}

export const resp = (
  res: Response,
  httpStatus: number,
  status: respStatus,
  result?: any,
  msg?: string,
) => {
  const resp: respInterface = {
    code: httpStatus,
    status: status,
  };
  if (result)
    Array.isArray(result)
      ? (resp.result = result)
      : Object.keys(result).length > 0
      ? (resp.result = [result])
      : null;
  if (msg) resp.message = msg;
  return res.status(httpStatus).json(resp);
};
