import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DynamicFormModule } from '@spartacus/dynamicforms';
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
import { ProductConfigurationFormComponent } from './form/product-configuration-form.component';
import { ProductConfigurationMiniCartComponent } from './mini-cart/product-configuration-mini-cart.component';
import { ProductConfigurationNavigationComponent } from './navigation/product-configuration-navigation.component';
import { FSDynamicformsModule } from '../../../dynamic-forms/dynamic-forms.module';
import { MiniCartCurrencyPipe } from '../../../../shared/util/helpers/pipe/currency-detector.pipe';

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
    FSDynamicformsModule,
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
    MiniCartCurrencyPipe,
  ],
  exports: [
    ProductConfigurationFormComponent,
    ProductConfigurationMiniCartComponent,
    ProductConfigurationNavigationComponent,
    MiniCartCurrencyPipe,
  ],
})
export class ProductConfigurationModule {}
