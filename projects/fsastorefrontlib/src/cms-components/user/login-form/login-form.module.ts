import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  I18nModule,
  NotAuthGuard,
  provideConfig,
  provideDefaultConfig,
  UrlModule,
} from '@spartacus/core';
import { FormErrorsModule } from '@spartacus/storefront';
import { LoginRegisterModule } from '@spartacus/user/account/components';
import { FSLoginFormComponent } from './login-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    UrlModule,
    I18nModule,
    FormErrorsModule,
    LoginRegisterModule,
  ],
  providers: [
    provideConfig(<CmsConfig>{
      cmsComponents: {
        ReturningCustomerLoginComponent: {
          component: FSLoginFormComponent,
          guards: [NotAuthGuard],
        },
      },
    }),
  ],
  declarations: [FSLoginFormComponent],
  exports: [FSLoginFormComponent],
  entryComponents: [FSLoginFormComponent],
})
export class FSLoginFormModule {}
