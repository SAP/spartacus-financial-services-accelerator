import { Product, Price, UserSignUp, Category, User } from '@spartacus/core';

export interface FSProduct extends Product {
  price?: FSPrice;
  cartDispalyName?: string;
  defaultCategory?: Category;
}

export interface FSPrice extends Price {
  oneTimeChargeEntries?: OneTimeChargeEntry[];
}

export interface OneTimeChargeEntry {
  code?: string;
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

export interface FSUserSignUp extends UserSignUp {
  dateOfBirth?: string;
}

export interface FSUser extends User {
  dateOfBirth?: string;
}
