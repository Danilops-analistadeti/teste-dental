export const daysOfMonth = (date: string): number => {
  const sourceDate = new Date(date);
  const fullYear = sourceDate.getFullYear();
  const month = sourceDate.getMonth() + 1;
  return new Date(fullYear, month, 0).getDate();
};
