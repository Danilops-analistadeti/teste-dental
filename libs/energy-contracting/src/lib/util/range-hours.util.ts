export const rangeMonthHours = (
  startDate: string | Date,
  endDate: string | Date
): number => {
  startDate = new Date(startDate);
  endDate = new Date(endDate);

  const date = Math.floor(
    (Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()) -
      Date.UTC(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate()
      )) /
      (1000 * 60 * 60 * 24)
  );

  return (date + 1) * 24;
};
