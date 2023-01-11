import { Injectable } from '@angular/core';
import { Config } from '@spartacus/core';

@Injectable({
  providedIn: 'root',
  useExisting: Config,
})
export abstract class QuoteComparisonConfig {
  categoryConfig?: CategoryComparisonConfig[];
}

export class CategoryComparisonConfig {
  categoryCode: string;
  billingEvents: boolean;
  optionalProducts: boolean;
  visibleInsuredObjects: string[];
}

declare module '@spartacus/core' {
  interface Config extends QuoteComparisonConfig {}
}
