import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { provideConfig } from '@spartacus/core';
import { CART_NORMALIZER } from '@spartacus/cart/base/root';
import { CartAdapter } from '../../../core/cart/connectors/cart.adapter';
import { defaultOccCartConfig } from './default-occ-cart-config';
import { OccCartAdapter } from '../cart/occ-cart.adapter';
import { FSOccCartNormalizer } from './converters/occ-cart-normalizer';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    {
      provide: CartAdapter,
      useClass: OccCartAdapter,
    },
    {
      provide: CART_NORMALIZER,
      useExisting: FSOccCartNormalizer,
      multi: true,
    },
    provideConfig(defaultOccCartConfig),
  ],
})
export class FsCartOccModule {}
