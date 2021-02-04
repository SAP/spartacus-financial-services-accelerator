import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  AuthGuard,
  CmsConfig,
  I18nModule,
  provideDefaultConfig,
  UserAddressService,
} from '@spartacus/core';
import {
  AddressBookComponentService,
  CardModule,
  FormErrorsModule,
  IconModule,
  SpinnerModule,
} from '@spartacus/storefront';
import { FSAddressBookComponent } from './address-book.component';
import { FSAddressFormComponent } from './address-form/address-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    NgSelectModule,
    IconModule,
    FormErrorsModule,
    CardModule,
    SpinnerModule,
    I18nModule,
  ],
  declarations: [FSAddressBookComponent, FSAddressFormComponent],
  exports: [FSAddressBookComponent, FSAddressFormComponent],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        AccountAddressBookComponent: {
          component: FSAddressBookComponent,
          guards: [AuthGuard],
        },
      },
    }),
  ],
  entryComponents: [FSAddressBookComponent, FSAddressFormComponent],
})
export class FSAddressBookModule {}
