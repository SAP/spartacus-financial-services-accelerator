import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  RegisterComponentModule,
  PageLayoutComponent,
} from '@spartacus/storefront';
import {
  I18nModule,
  UrlModule,
  ConfigModule,
  NotAuthGuard,
} from '@spartacus/core';
import { FSRegisterComponent } from './fs-register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

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
