import { YFormData } from '@spartacus/dynamicforms';
import {
  B2BUser,
  Cart,
  Category,
  Occ,
  OrderEntry,
  Price,
  Product,
  User,
} from '@spartacus/core';
import { CheckoutStep } from '@spartacus/checkout/root';
import { UserSignUp } from '@spartacus/user/profile/root';

export interface ContactAgentData {
  email?: string;
  interest?: string;
  contactType?: string;
  subject?: string;
  message?: string;
}

export interface BundleTemplate {
  id: string;
  name?: string;
  childBundleTemplates?: BundleTemplate[];
}

export interface FSProduct extends Product {
  price?: FSPrice;
  cartDispalyName?: string;
  defaultCategory?: Category;
  bundleTemplates?: BundleTemplate[];
  configurable?: boolean;
  dynamicAttributes?: Map<string, any>;
}

export interface YFormConfiguratorSettings {
  configurationFormId?: string;
  configuratorType?: string;
  configurationApplicationId?: string;
  configurationCategory?: Category;
}

export interface FSCategory extends Category {
  yformConfiguratorSettings?: YFormConfiguratorSettings[];
}

export interface OrgUnit {
  uid: string;
  name?: string;
  active?: boolean;
}

export interface B2BAdministrator {
  orgUnit: OrgUnit;
}

export interface FSOrderEntry extends OrderEntry {
  configurationInfos?: any[];
  removeable?: boolean;
}

export interface FSCart extends Cart {
  insuranceQuote?: InsuranceQuote;
  entries?: FSOrderEntry[];
}

export interface InsuranceQuoteList {
  insuranceQuotes: InsuranceQuote[];
}

export interface QuoteWorkflowStatus {
  code?: string;
}

export interface InsuranceQuote {
  quoteId?: string;
  cartCode?: string;
  state?: QuoteBindingState;
  defaultCategory?: Occ.Category;
  quoteStatus?: QuoteStatus;
  quotePrice?: Occ.Price;
  paymentFrequency?: string;
  quoteWorkflowStatus?: QuoteWorkflowStatus;
  quoteDetails?: Record<string, string>;
  insuredObjectList?: InsuredObjectList;
}

export enum OrganizationTableType {
  PRODUCT_ASSIGNMENTS = 'productAssignments',
  POTENTIAL_PRODUCT_ASSIGNMENTS = 'potentialProductAssignments',
}

export interface InsuredObjectList {
  insuredObjects?: any[];
}
export interface QuoteBindingState {
  code?: string;
}

export interface QuoteStatus {
  code?: string;
}

export enum FSPaymentTypeEnum {
  INVOICE = 'INVOICE',
  CARD = 'CARD',
}

export enum BindingStateType {
  BIND = 'BIND',
  UNBIND = 'UNBIND',
}

export enum QuoteWorkflowStatusType {
  APPROVED = 'APPROVED',
  REFERRED = 'REFERRED',
  PENDING = 'PENDING',
}

export enum ConfiguratorType {
  PRODUCT_CONFIGURE_FORM = 'PRODUCT_CONFIGURE_FORM',
}
export enum FormDefinitionType {
  PRODUCT_CONFIGURE = 'PRODUCT_CONFIGURE',
  PERSONAL_DETAILS = 'PERSONAL_DETAILS',
}
export enum RequestType {
  INSURED_OBJECT_CHANGE = 'FSINSUREDOBJECT_CHANGE',
  INSURED_OBJECT_ADD = 'FSINSUREDOBJECT_ADD',
  COVERAGE_CHANGE = 'FSCOVERAGE_CHANGE',
  FSCLAIM = 'FSCLAIM',
}

export enum ClaimStatus {
  OPEN = 'OPEN',
  SUBMITTED = 'SUBMITTED',
  PROCESSING = 'PROCESSING',
  ERROR = 'ERROR',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}
export enum ChangeRequestStatus {
  SUBMITTED = 'SUBMITTED',
  REFERRED = 'REFERRED',
}
export enum StepStatus {
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
}

export enum QuoteActionType {
  BIND = 'BIND',
  UNDERWRITING = 'UNDERWRITING',
  UPDATE = 'UPDATE',
}

export interface FSOrderEntry extends OrderEntry {
  formData?: any[];
  product?: FSProduct;
}

export interface FSPrice extends Price {
  oneTimeChargeEntries?: OneTimeChargeEntry[];
  recurringChargeEntries?: RecurringChargeEntry[];
}

export interface OneTimeChargeEntry {
  code?: string;
  name?: string;
  price?: Price;
  billingTime?: BillingTime;
  chargeInformation?: string;
}

export interface RecurringChargeEntry {
  price?: Price;
}

export interface BillingTime {
  code?: string;
  name?: string;
  description?: string;
}

export interface FSB2BUser extends B2BUser {
  dateOfBirth?: string;
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
  summaryStep?: boolean;
}

export interface FSUserRequest {
  requestId?: string;
  configurationSteps?: FSStepData[];
  requestStatus?: string;
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
  documents?: any;
  properties?: any;
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

export interface ChangedPolicyData {
  changeType?: string;
  label?: string;
  oldValue?: string;
  newValue?: string;
}

export interface FSCheckoutStep extends CheckoutStep {
  restrictedCategories?: string[];
}
export interface FSSteps {
  stepParameter: string;
  step: string;
}

export interface FSProductAssignment {
  assignmentCode?: string;
  name?: string;
  added?: boolean;
  active?: boolean;
}
