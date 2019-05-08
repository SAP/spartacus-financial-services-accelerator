import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutPageLayoutComponent } from './checkout-page-layout.component';
import { CheckoutModule } from '../../../checkout';
import {
  FsaMultiStepCheckoutComponent
} from '../../../checkout/assets/components/fsa-multi-step-checkout/fsa-multi-step-checkout.component';

import { CmsModule, PageSlotModule } from '@spartacus/storefront';

@NgModule({
  imports: [CommonModule, CheckoutModule, CmsModule, PageSlotModule],
  declarations: [CheckoutPageLayoutComponent, FsaMultiStepCheckoutComponent],
  exports: [CheckoutPageLayoutComponent, FsaMultiStepCheckoutComponent]
})
export class CheckoutPageLayoutModule { }
