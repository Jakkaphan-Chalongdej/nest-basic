export interface IUserInfo {
  fullName: string;
  role: string;
}
export interface IRespLogin {
  userInfo: IUserInfo;
  accessToken: string;
}
