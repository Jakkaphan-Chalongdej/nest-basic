import { getDateSerialNO, zeroPad } from '../helper/date-helper';

export const isEmpty = (value: any): boolean => {
  if (value === undefined || value === null) {
    return true;
  }
  if (typeof value === 'object') {
    return Object.keys(value).length === 0;
  }
  if (typeof value === 'string') {
    return value.trim().length === 0;
  }
  return false;
};
export function generateNumber(versionNumber: number) {
  const date = getDateSerialNO();
  const version = zeroPad(versionNumber, 3);
  const string = `${date}-${version}`;
  return string;
}
