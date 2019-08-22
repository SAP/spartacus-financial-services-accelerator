import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nModule } from '@spartacus/core';

import { FsPaymentFormComponent } from './fs-payment-form.component';

import {BillingAddressFormModule, CardModule, IconModule} from '@spartacus/storefront';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgSelectModule,
    CardModule,
    BillingAddressFormModule,
    I18nModule,
    IconModule,
  ],
  declarations: [FsPaymentFormComponent],
  entryComponents: [FsPaymentFormComponent],
  exports: [FsPaymentFormComponent],
})
export class FsPaymentFormModule {}
