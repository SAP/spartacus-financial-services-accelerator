import { CheckoutStep } from '@spartacus/storefront';

export interface FSCheckoutStep extends CheckoutStep {
  restrictedCategories?: string[];
}
