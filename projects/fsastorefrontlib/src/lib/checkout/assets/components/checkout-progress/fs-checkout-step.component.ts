import { CheckoutStep } from '@spartacus/storefront';


export interface FSCheckoutStep extends CheckoutStep {
    icon?: string;
    hideStepCategoriesRegex?: string[];
}
