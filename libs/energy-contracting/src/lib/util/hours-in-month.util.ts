import { daysOfMonth } from './days-of-month.util';

export const hoursInMonth = (date: string): number => daysOfMonth(date) * 24;

