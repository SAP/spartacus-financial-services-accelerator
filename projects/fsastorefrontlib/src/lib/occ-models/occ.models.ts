import { Product, Price} from '@spartacus/core';

export interface FSProduct extends Product {
  price?: FSPrice;
}

export interface FSPrice extends Price {
  oneTimeChargeEntries?: OneTimeChargeEntry[];
}

export interface OneTimeChargeEntry {
  name?: string;
  price?: Price;
  billingTime?: BillingTime;
}

export interface BillingTime {
  code?: string;
  name?: Price;
  description?: BillingTime;
}
