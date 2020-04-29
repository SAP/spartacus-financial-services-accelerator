import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YFormCMSComponent } from './yform-cms.component';
import { ConfigModule, CmsConfig } from '@spartacus/core';
import { SpinnerModule } from '@spartacus/storefront';
import { FormContainerModule } from './../../core/form-containers/form-container.module';

@NgModule({
  declarations: [YFormCMSComponent],
  imports: [
    CommonModule,
    SpinnerModule,
    FormContainerModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        YFormCMSComponent: {
          component: YFormCMSComponent,
        },
      },
    }),
  ],
  entryComponents: [YFormCMSComponent],
  exports: [YFormCMSComponent],
})
export class YFormCMSModule {}
