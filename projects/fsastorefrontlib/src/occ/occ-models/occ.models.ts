import {
  Cart,
  Category,
  OrderEntry,
  Price,
  Product,
  User,
  UserSignUp,
} from '@spartacus/core';
import { YFormData } from '@fsa/dynamicforms';

export interface ContactAgentData {
  email?: string;
  interest?: string;
  contactType?: string;
  subject?: string;
  message?: string;
}

export interface FSProduct extends Product {
  price?: FSPrice;
  cartDispalyName?: string;
  defaultCategory?: Category;
}

export interface OrgUnit {
  uid: string;
  name?: string;
  active?: boolean;
}

export interface B2BAdministrator {
  orgUnit: OrgUnit;
}

export interface FSCart extends Cart {
  insuranceQuote?: InsuranceQuote;
}

export interface InsuranceQuote {
  quoteId?: string;
  state?: QuoteBindingState;
}

export interface QuoteBindingState {
  code?: string;
}

export enum BindingStateType {
  BIND = 'BIND',
  UNBIND = 'UNBIND',
}

export enum ClaimStatus {
  OPEN = 'OPEN',
  SUBMITTED = 'SUBMITTED',
  PROCESSING = 'PROCESSING',
  ERROR = 'ERROR',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
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
  yformConfigurator?: YFormData;
}

export interface FSUserRequest {
  requestId?: string;
  configurationSteps?: FSStepData[];
}

export interface FSLocationOfLoss {
  code?: string;
  countryCode?: string;
  city?: string;
  postcode?: string;
  address?: string;
  additionalDetails?: string;
}

export interface Claim extends FSUserRequest {
  claimNumber?: string;
  locationOfLoss?: FSLocationOfLoss;
  causeOfLoss?: string;
  incidentType?: FSIncidentType;
  dateOfLoss?: string;
  timeOfLoss?: string;
  claimStatus?: ClaimStatus;
}

export interface AllowedFSRequestType {
  requestType?: FSRequestType;
}

export interface FSRequestType {
  code?: string;
}

export interface FSIncidentType {
  incidentCode?: string;
}
