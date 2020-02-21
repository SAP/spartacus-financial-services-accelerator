import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgSelectModule } from '@ng-select/ng-select';
import {
  AuthGuard,
  CmsConfig,
  ConfigModule,
  I18nModule,
  RoutesConfig,
  RoutingConfig,
} from '@spartacus/core';
import {
  CmsPageGuard,
  PageLayoutComponent,
  SpinnerModule,
  CardModule,
} from '@spartacus/storefront';
import { ActiveProductsComponent } from './unit-details/active-products.component';

const routes: Routes = [
  {
    path: null,
    canActivate: [AuthGuard, CmsPageGuard],
    data: {
      cxRoute: 'unitDetails',
      pageLabel: 'groupPolicyUnitDetailsPage',
    },
    component: PageLayoutComponent,
  }
];

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    RouterModule,
    FormsModule,
    NgSelectModule,
    SpinnerModule,
    CardModule,
    RouterModule.forChild(routes),
    ConfigModule.withConfig(<CmsConfig | RoutesConfig | RoutingConfig>{
      cmsComponents: {
        ActiveProductsFlexComponent: {
          component: ActiveProductsComponent,
        },
      },
    }),
  ],
  declarations: [
    ActiveProductsComponent
  ],
  exports: [ActiveProductsComponent],
  providers: [
    ActiveProductsComponent
  ],
  entryComponents: [
    ActiveProductsComponent
  ],
})
export class GroupPolicyModule {}
