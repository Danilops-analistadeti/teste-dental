import { KeyValue } from '@energy-contracting';

export const compareFn = (v1: KeyValue, v2: KeyValue): boolean => (v1 && v2 ? v1.value === v2.value : v1 === v2);
