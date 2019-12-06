import {
  Cart,
  Category,
  OrderEntry,
  Price,
  Product,
  User,
  UserSignUp,
} from '@spartacus/core';

export interface FSProduct extends Product {
  price?: FSPrice;
  cartDispalyName?: string;
  defaultCategory?: Category;
}

export interface FSCart extends Cart {
  insuranceQuote?: any;
}

export interface FSOrderEntry extends OrderEntry {
  formDataData?: any[];
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
  phoneNumber?: string;
}

export interface FSContactInfo {
  code?: string;
  phoneNumber?: string;
}

export interface FSUser extends User {
  dateOfBirth?: string;
  contactInfos?: FSContactInfo[];
}

export interface FSStepData {
  name?: string;
  sequenceNumber?: string;
  pageLabelOrId?: string;
  status?: string;
  yFormConfigurator?: string;
}

export interface FSUserRequest {
  requestId?: string;
  configurationSteps?: FSStepData[];
}

export interface Claim extends FSUserRequest {
  claimNumber?: string;
}

export interface AllowedFSRequestType {
  requestType?: FSRequestType;
}

export interface FSRequestType {
  code?: string;
}
