import { FullDate } from '../interfaces/full-date.interface';

export const parseStringToDate = (date: string): Date => {
  const dateSplit = splitDate(date);
  const newDate = new Date(dateSplit.year, dateSplit.month, dateSplit.day);
  newDate.setHours(dateSplit.hour);
  newDate.setMinutes(dateSplit.minute);
  newDate.setSeconds(Number(dateSplit.second));
  return newDate;
};

export const parseUTCToDate = (date: Date | string): Date => {
  const dateSplit = splitDate(date);
  const newDate = new Date(dateSplit.day, dateSplit.month, dateSplit.year);
  newDate.setHours(dateSplit.hour);
  newDate.setMinutes(dateSplit.minute);
  newDate.setSeconds(dateSplit.second);
  return newDate;
};

export const splitDate = (date: string | Date): FullDate => {
  const parts = (date as string)
    .trim()
    .replace(/ +(?= )/g, '')
    ?.split(/[\s-/T\/:]/);
  const hour = Number(parts[3]);
  const minute = Number(parts[4]);
  const second = Number(parts[5]?.split('Z')[0]);
  const day = Number(parts[0]);
  const month = Number(Number(parts[1]) - 1);
  const year = Number(parts[2]);
  return { hour, minute, second, day, month, year };
};

export const convertLocalDateToUTCIgnoringTimezone = (date: Date): Date => {
  if (date instanceof Date) {
    const timestamp = Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
      date.getMilliseconds()
    );

    return new Date(timestamp);
  }

  return new Date(date);
};

export const convertUTCToLocalDateIgnoringTimezone = (utcDate: Date): Date =>
  new Date(
    utcDate.getUTCFullYear(),
    utcDate.getUTCMonth(),
    utcDate.getUTCDate(),
    utcDate.getUTCHours(),
    utcDate.getUTCMinutes(),
    utcDate.getUTCSeconds(),
    utcDate.getUTCMilliseconds()
  );

export const createLocaleDateToUTC = (timeZone = 'America/Sao_Paulo'): Date => {
  const localDate = new Date();
  const strTime = localDate.toLocaleString('pt-BR', { timeZone });
  return parseStringToDate(strTime);
};

export const getDateStringNoTime = (date: Date): string => {
  const auxDay = date.getDate().toString();
  const day = auxDay.length > 1 ? auxDay : `0${auxDay}`;
  const auxMonth = (date.getMonth() + 1).toString();
  const month = auxMonth.length > 1 ? auxMonth : `0${auxMonth}`;
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
};

export const convertStringToDate = (
  dateString: Date | string,
  split = '/'
): Date => {
  if (typeof dateString === 'string') {
    const dateSplit = dateString
      .split(split)
      .reverse()
      .map((digit) => Number(digit));

    return new Date(dateSplit[0], dateSplit[1] - 1, dateSplit[2]);
  }

  return dateString;
};
