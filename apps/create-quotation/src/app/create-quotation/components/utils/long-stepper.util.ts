import * as moment from 'moment';

export const longStepper = (startDate: Date, endDate: Date): boolean => {
  const diffMonths = moment(endDate).diff(startDate, 'months');
  const startDiffMonthsNewDate = moment().diff(startDate, 'months');

  return diffMonths < 6 && startDiffMonthsNewDate < 2;
};
