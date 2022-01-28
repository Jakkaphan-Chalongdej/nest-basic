import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IUserInfoDecorator } from '../interface/userinfo.interface';

export const UserInfo = createParamDecorator((ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const userInfo: IUserInfoDecorator = {
    uuid: request['uuid'],
  };
  return userInfo;
});
