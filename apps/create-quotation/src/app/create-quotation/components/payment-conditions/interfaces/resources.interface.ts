import { KeyValue } from '@angular/common';
import { INDEXER } from '@energy-contracting';

export interface Resources {
  indexer: KeyValue<string, INDEXER>[],
}
