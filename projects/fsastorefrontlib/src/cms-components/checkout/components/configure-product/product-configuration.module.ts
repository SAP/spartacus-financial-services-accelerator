import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DynamicFormModule } from '@fsa/dynamicforms';
import {
  CmsConfig,
  ConfigModule,
  I18nModule,
  RoutesConfig,
  RoutingConfig,
} from '@spartacus/core';
import {
  CmsPageGuard,
  PageComponentModule,
  PageLayoutComponent,
  SpinnerModule,
} from '@spartacus/storefront';
import { CategoryStepGuard } from '../../guards';
import { FormComponentsModule } from './../form-components/form-component.module';
import { ProductConfigurationFormComponent } from './form/product-configuration-form.component';
import { ProductConfigurationMiniCartComponent } from './mini-cart/product-configuration-mini-cart.component';
import { ProductConfigurationNavigationComponent } from './navigation/product-configuration-navigation.component';

const routes: Routes = [
  {
    path: null,
    canActivate: [CmsPageGuard, CategoryStepGuard],
    data: {
      cxRoute: 'configureProduct',
      pageLabel: 'productDetails',
    },
    component: PageLayoutComponent,
  },
];

@NgModule({
  imports: [
    I18nModule,
    FormComponentsModule,
    DynamicFormModule,
    CommonModule,
    PageComponentModule,
    SpinnerModule,
    RouterModule.forChild(routes),
    ConfigModule.withConfig(<CmsConfig | RoutesConfig | RoutingConfig>{
      cmsComponents: {
        ProductConfigurationFormFlex: {
          component: ProductConfigurationFormComponent,
        },
        ProductConfigurationMiniCartFlex: {
          component: ProductConfigurationMiniCartComponent,
        },
        ProductConfigurationFormNavigationFlex: {
          component: ProductConfigurationNavigationComponent,
        },
      },
    }),
  ],
  declarations: [
    ProductConfigurationFormComponent,
    ProductConfigurationMiniCartComponent,
    ProductConfigurationNavigationComponent,
  ],
  exports: [
    ProductConfigurationFormComponent,
    ProductConfigurationMiniCartComponent,
    ProductConfigurationNavigationComponent,
  ],
  entryComponents: [
    ProductConfigurationFormComponent,
    ProductConfigurationMiniCartComponent,
    ProductConfigurationNavigationComponent,
  ],
  providers: [],
})
export class ProductConfigurationModule {}
