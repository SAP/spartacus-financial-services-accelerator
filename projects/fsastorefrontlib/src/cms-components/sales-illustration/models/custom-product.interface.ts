import { Product } from '@spartacus/core';

export interface CustomProduct extends Product {
  dynamicAttributes?: any;
  salesIllustrations?: any;
  configurable?: boolean;
}
