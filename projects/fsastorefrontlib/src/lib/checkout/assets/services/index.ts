import { FSCartService } from './fs-cart.service';
import { FSCheckoutConfigService } from './fs-checkout-config.service';

export const services: any[] = [
  FSCartService,
  FSCheckoutConfigService
];

export * from '../../../checkout/assets/services/fs-cart.service';
export * from '../../../checkout/assets/services/fs-checkout-config.service';
