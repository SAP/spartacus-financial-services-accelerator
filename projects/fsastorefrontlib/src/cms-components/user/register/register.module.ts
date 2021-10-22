import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import {
  ConfigModule,
  I18nModule,
  NotAuthGuard,
  UrlModule,
} from '@spartacus/core';
import {
  FormErrorsModule,
  PageLayoutComponent,
  SpinnerModule,
} from '@spartacus/storefront';
import { FSRegisterComponent } from './register.component';
import { RegisterComponentModule } from '@spartacus/user/profile/components';
import { NgSelectModule } from '@ng-select/ng-select';

const routes: Routes = [
  {
    path: 'login/register',
    redirectTo: 'register',
  },
  {
    path: 'register',
    data: {
      cxRoute: 'register',
      pageLabel: 'register',
    },
    component: PageLayoutComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgSelectModule,
    I18nModule,
    FormErrorsModule,
    SpinnerModule,
    UrlModule,
    RouterModule.forChild(routes),
    RegisterComponentModule,
    ConfigModule.withConfig({
      cmsComponents: {
        RegisterCustomerComponent: {
          component: FSRegisterComponent,
          guards: [NotAuthGuard],
        },
      },
    }),
  ],
  declarations: [FSRegisterComponent],
  exports: [FSRegisterComponent],
  entryComponents: [FSRegisterComponent],
})
export class FSRegisterModule {}
