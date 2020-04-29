import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigModule, CmsConfig, I18nModule } from '@spartacus/core';
import { CmsFormSubmitComponent } from './cms-form-submit.component';
import { DynamicFormModule } from '@fsa/dynamicforms';
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
          component: CmsFormSubmitComponent,
        },
      },
    }),
  ],
  declarations: [CmsFormSubmitComponent],
  exports: [CmsFormSubmitComponent],
  entryComponents: [CmsFormSubmitComponent],
})
export class CmsFormSubmitModule {}
