import { FSCartEffects } from './fs-cart.effect';
import { FSProductEffect } from './fs-product.effect';
import { FSCheckoutEffects } from './fs-checkout.effect';

export const effects: any[] = [
  FSCartEffects,
  FSProductEffect,
  FSCheckoutEffects,
];

export * from './fs-cart.effect';
export * from './fs-product.effect';
export * from './fs-checkout.effect';
