import { KeyValue } from '@angular/common';
import { ModulationType } from '../../public-api';

export interface ResourcesCustomization {
  modulationType: KeyValue<string, ModulationType>[];
}
