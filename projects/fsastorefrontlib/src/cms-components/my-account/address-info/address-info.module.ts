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
} from '@spartacus/core';
import {
  CardModule,
  FormErrorsModule,
  IconModule,
  SpinnerModule,
} from '@spartacus/storefront';
import { FSAddressInfoComponent } from './address-info.component';
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
    providers: [
        provideDefaultConfig(<CmsConfig>{
            cmsComponents: {
                AccountAddressInfoComponent: {
                    component: FSAddressInfoComponent,
                    guards: [AuthGuard],
                },
            },
        }),
    ],
    declarations: [FSAddressInfoComponent, FSAddressFormComponent],
    exports: [FSAddressInfoComponent, FSAddressFormComponent]
})
export class FSAddressBookModule {}
