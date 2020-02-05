import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ConfigModule,
  CmsConfig,
  I18nModule,
  CmsModule,
} from '@spartacus/core';
import { CmsCustomContainerComponent } from './cms-custom-container';
import { PageComponentModule, SpinnerModule } from '@spartacus/storefront';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    PageComponentModule,
    CmsModule,
    SpinnerModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        CMSCustomDefineStyleCMSComponentsContainer: {
          component: CmsCustomContainerComponent,
        },
      },
    }),
  ],
  declarations: [CmsCustomContainerComponent],
  exports: [CmsCustomContainerComponent],
  entryComponents: [CmsCustomContainerComponent],
})
export class CustomContainerModule {}
