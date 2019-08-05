import { CheckoutStep } from "@spartacus/storefront";

export interface FSCheckoutStep extends CheckoutStep {
    status: string;
    icon: string;
    progressBar: string;
}