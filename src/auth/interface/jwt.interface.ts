import { JWT_TYPE } from '../enum/jwt.enum';

export interface IJwtPayload {
  uuid: string;
  role: string;
  type?: JWT_TYPE;
}
