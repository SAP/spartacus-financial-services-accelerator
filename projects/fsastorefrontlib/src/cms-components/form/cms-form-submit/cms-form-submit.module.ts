import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigModule, CmsConfig, I18nModule } from '@spartacus/core';
import { CMSFormSubmitComponent } from './cms-form-submit.component';
import { DynamicFormModule } from '@spartacus/dynamicforms';
import { SpinnerModule, PageComponentModule } from '@spartacus/storefront';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    DynamicFormModule,
    SpinnerModule,
    PageComponentModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        CMSFormSubmitComponent: {
          component: CMSFormSubmitComponent,
        },
      },
    }),
  ],
  declarations: [CMSFormSubmitComponent],
  exports: [CMSFormSubmitComponent],
})
export class CmsFormSubmitModule {}
