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
  PageLayoutComponent,
} from '@spartacus/storefront';
import {
  RegisterComponentModule,
} from '@spartacus/user/profile/components';
import { FSRegisterComponent } from './register.component';

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
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    CommonModule,
    RegisterComponentModule,
    I18nModule,
    ConfigModule.withConfig({
      cmsComponents: {
        RegisterCustomerComponent: {
          component: FSRegisterComponent,
          guards: [NotAuthGuard],
        },
      },
    }),
    RouterModule,
    UrlModule,
  ],
  declarations: [FSRegisterComponent],
  exports: [FSRegisterComponent],
  entryComponents: [FSRegisterComponent],
})
export class FSRegisterModule {}
