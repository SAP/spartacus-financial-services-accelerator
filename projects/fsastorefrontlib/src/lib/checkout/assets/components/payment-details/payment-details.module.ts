import { NgModule } from '@angular/core';
import { UserService, UrlTranslationModule } from '@spartacus/core';
import { PaymentDetailsComponent } from './payment-details.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ɵr as PaymentMethodModule, ComponentsModule } from '@spartacus/storefront';
import { ɵs as PaymentFormModule } from '@spartacus/storefront';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    PaymentMethodModule,
    PaymentFormModule,
    UrlTranslationModule,
    ComponentsModule,
  ],
  providers: [UserService],
  declarations: [PaymentDetailsComponent],
  entryComponents: [PaymentDetailsComponent],
  exports: [PaymentDetailsComponent]
})
export class PaymentDetailsModule { }
