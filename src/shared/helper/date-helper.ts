import * as dayjs from 'dayjs';
import * as timezone from 'dayjs/plugin/timezone';
import * as isBetween from 'dayjs/plugin/isBetween';
import * as utc from 'dayjs/plugin/utc';
import 'dayjs/locale/th';
// import { UnitType } from 'dayjs';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isBetween);
dayjs.locale('th');

const timeZone = 'asia/Bangkok';

export const getDateSerialNO = (): string => {
  const _date = dayjs().add(543, 'year').tz(timeZone).format('DDMMYY');
  return _date;
};

export const getDate = (timestamp: number, format = 'DD-MM-YYYY'): string => {
  let _data: number = timestamp;
  if (typeof timestamp === 'string') _data = parseInt(timestamp);
  const day = dayjs(_data).tz(timeZone).format(format);
  return day;
};

export const getStartDateAndEndDate = (timestamp: number) => {
  let _data: number = timestamp;
  if (typeof timestamp === 'string') {
    _data = parseInt(timestamp);
  }
  const startDate = dayjs(_data).startOf('day').valueOf();
  const endDate = dayjs(_data).endOf('day').valueOf();
  return { startDate: startDate, endDate: endDate };
};

export const zeroPad = (num: number, size: number) => {
  const s = '000000000' + num;
  return s.substr(s.length - size);
};
