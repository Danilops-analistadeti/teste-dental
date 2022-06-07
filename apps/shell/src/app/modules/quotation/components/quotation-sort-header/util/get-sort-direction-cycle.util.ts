import { SortDirection } from '../type/sort-direction';

export const getSortDirectionCycle = (start: 'asc' | 'desc', disableClear: boolean): SortDirection[] => {
  const sortOrder: SortDirection[] = ['asc', 'desc'];
  if (start === 'desc') { sortOrder.reverse(); }
  if (!disableClear) { sortOrder.push(''); }

  return sortOrder;
};
