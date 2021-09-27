import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  I18nModule,
  NotAuthGuard,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { FormErrorsModule, SpinnerModule } from '@spartacus/storefront';
import { LoginRegisterModule } from '@spartacus/user/account/components';
import { FSLoginFormComponent } from './login-form.component';
import { FSLoginRegisterComponent } from './login-register.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    UrlModule,
    I18nModule,
    FormErrorsModule,
    SpinnerModule,
    LoginRegisterModule,
  ],
  providers: [
    provideDefaultConfig(<CmsConfig>{
      cmsComponents: {
        ReturningCustomerLoginComponent: {
          component: FSLoginFormComponent,
          guards: [NotAuthGuard],
        },
      },
    }),
  ],
  declarations: [FSLoginFormComponent, FSLoginRegisterComponent],
  exports: [FSLoginFormComponent, FSLoginRegisterComponent],
  entryComponents: [FSLoginFormComponent, FSLoginRegisterComponent],
})
export class FSLoginFormModule {}
