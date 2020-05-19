import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { provideConfig } from '@spartacus/core';
import { CartAdapter } from '../../../core/cart/connectors/cart.adapter';
import { defaultOccCartConfig } from './default-occ-cart-config';
import { OccCartAdapter } from '../cart/occ-cart.adapter';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [
    {
      provide: CartAdapter,
      useClass: OccCartAdapter,
    },
    provideConfig(defaultOccCartConfig),
  ],
})
export class FsCartOccModule {}
