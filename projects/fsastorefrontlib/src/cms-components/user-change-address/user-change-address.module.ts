import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { I18nModule } from '@spartacus/core';
import { FormErrorsModule, SpinnerModule } from '@spartacus/storefront';
import { UserChangeAddressComponent } from './user-change-address.component';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    ReactiveFormsModule,
    FormErrorsModule,
    NgSelectModule,
    SpinnerModule,
  ],
  declarations: [UserChangeAddressComponent],
  exports: [UserChangeAddressComponent],
})
export class UserChangeAddressModule {}
