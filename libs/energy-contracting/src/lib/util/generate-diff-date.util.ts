import { FullDate } from '../interfaces/full-date.interface';
import { createLocaleDateToUTC } from './date.util';

export const generateDiffDate = (today: Date, proposal: Date): FullDate => {
  if (proposal) {
    const diff = Math.abs(checkNegativeDate(today, proposal));
    return {
      day: Math.floor(diff / 86400000),
      hour: Math.floor((diff % 86400000) / 3600000),
      minute: Math.round(((diff % 86400000) % 3600000) / 60000)
    };
  }
};

export const generateDateWithState = (date: any): FullDate | undefined => {
  const localeDate = createLocaleDateToUTC();
  const parseDate = new Date(date);
  const negativeDate = checkNegativeDate(localeDate, parseDate);
  if (negativeDate > 0) {
    const diffDate = generateDiffDate(localeDate, parseDate);
    diffDate.hour += diffDate.day > 0 ? diffDate.day * 24 : 0;

    return diffDate;
  }
  return;
};

export const checkNegativeDate = (date1: Date, date2: Date): number => date2.getTime() - date1.getTime();

export function getMonthsDiff(startDate = new Date(), endDate = new Date()) {
  let monthsOfFullYears = getYearsDiff(startDate, endDate) * 12;
  let months = monthsOfFullYears;

  let yearsAfterStart = new Date(
    startDate.getFullYear() + getYearsDiff(startDate, endDate),
    startDate.getMonth(),
    startDate.getDate()
  );
  let isDayAhead = endDate.getDate() >= yearsAfterStart.getDate();

  if (startDate.getMonth() == endDate.getMonth() && !isDayAhead) {
    months = 11;
    return months;
  }

  if (endDate.getMonth() >= yearsAfterStart.getMonth()) {
    let diff = endDate.getMonth() - yearsAfterStart.getMonth();
    months += isDayAhead ? diff : diff - 1;
  } else {
    months += isDayAhead
      ? 12 - (startDate.getMonth() - endDate.getMonth())
      : 12 - (startDate.getMonth() - endDate.getMonth()) - 1;
  }

  return months;
}

export function getYearsDiff(startDate = new Date(), endDate = new Date()) {
  if (startDate > endDate) [startDate, endDate] = [endDate, startDate];

  let yearB4End = new Date(endDate.getFullYear() - 1, endDate.getMonth(), endDate.getDate());
  let year = 0;
  year = yearB4End > startDate ? yearB4End.getFullYear() - startDate.getFullYear() : 0;
  let yearsAfterStart = new Date(startDate.getFullYear() + year + 1, startDate.getMonth(), startDate.getDate());

  if (endDate >= yearsAfterStart) year++;

  return year;
}
