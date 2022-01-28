export enum ENUMErrorMessage {
  BAD_REQUEST = 'BAD_REQUEST',
  ALREADY_ADMIN = 'Already admin',
  // Type Notfound
  NOTFOUND = 'Not found',
  NOTFOUND_USERINFO = 'Not found user Info',
  NOTFOUND_ADMIN = 'Not found admin',
  NOTFOUND_MENU = 'Not found menu',

  NOTFOUND_USER = 'NOTFOUND_USER',
  ALREADY_USER = 'Already user',
}
export const ENUMErrorMessages = {
  NOTFOUND_USER: { TH: 'ไม่พบขอมูล USER', EN: 'Not found user' },
  NOTFOUND: { TH: 'ไม่พบขอมูล User', EN: 'Not found ' },
  NOTFOUND_USER_INFO: { TH: 'ไม่พบขอมูล User', EN: 'Not found user Info' },
  NOTFOUND_MENU: { TH: 'ไม่พบขอมูล Menu', EN: 'Not found menu' },
  ALREADY_USER: { TH: 'มี user นี้แล้ว', EN: 'Already user' },
  NOTFOUND_ROLE: { TH: 'ไม่พบขอมูล Role', EN: 'Not found role' },
  NOTFOUND_VISIT: { TH: 'ไม่พบขอมูล Visit', EN: 'Not found visit' },
  NOTFOUND_PATIENT: { TH: 'ไม่พบขอมูลผู้ป่วย', EN: 'Not found patient' },
};
