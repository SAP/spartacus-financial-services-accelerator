import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  CmsConfig,
  ConfigModule,
  I18nModule,
  RoutesConfig,
  RoutingConfig,
} from '@spartacus/core';
import { SelectIdentificationTypeComponent } from './select-identification/select-identification.component';
import { FSCheckoutService } from '../../../../core/checkout/facade';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    RouterModule,
    ConfigModule.withConfig(<CmsConfig | RoutesConfig | RoutingConfig>{
      cmsComponents: {
        SelectIdentificationTypeFlex: {
          component: SelectIdentificationTypeComponent,
        },
      },
    }),
  ],
  declarations: [SelectIdentificationTypeComponent],
  exports: [SelectIdentificationTypeComponent],
  providers: [FSCheckoutService],
})
export class UserIdentificationModule {}
