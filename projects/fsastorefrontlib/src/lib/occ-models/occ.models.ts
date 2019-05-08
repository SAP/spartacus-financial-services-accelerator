import { UIProduct, Price} from '@spartacus/core';

export interface FSProduct extends UIProduct {
  price?: FSPrice;
}

export interface FSPrice extends Price {
  oneTimeChargeEntries?: OneTimeChargeEntry[];
}

export interface OneTimeChargeEntry {
  name?: string;
  price?: Price;
  billingTime?: BillingTime;
  chargeInformation?: string;
}

export interface BillingTime {
  code?: string;
  name?: string;
  description?: string;
}
