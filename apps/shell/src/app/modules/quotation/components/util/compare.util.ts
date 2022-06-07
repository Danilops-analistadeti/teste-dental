export const compare = (a: number | string, b: number | string, isAsc: boolean): number => (a < b ? -1 : 1) * (isAsc ? 1 : -1);
