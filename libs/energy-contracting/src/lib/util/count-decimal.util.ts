export const countDecimals = (value: any) => value % 1 ? value.toString().split('.')[1].length : 0;
