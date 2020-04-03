import { CartEffects } from './cart.effect';
import { CheckoutEffects } from './checkout.effect';
import { ProductEffect } from './product.effect';

export const effects: any[] = [CartEffects, ProductEffect, CheckoutEffects];

export * from './cart.effect';
export * from './checkout.effect';
export * from './product.effect';
