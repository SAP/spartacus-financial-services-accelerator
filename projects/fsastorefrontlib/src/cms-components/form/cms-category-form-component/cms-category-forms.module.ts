import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigModule, CmsConfig, I18nModule } from '@spartacus/core';
import { CmsCategoryFormSubmitComponent } from './cms-category-form-submit.component';
import { DynamicFormModule } from '@fsa/dynamicforms';
import { SpinnerModule, PageComponentModule } from '@spartacus/storefront';
import { YFormCMSModule } from 'projects/dynamicforms/src/cms-components/yform-cms/yform-cms.module';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    DynamicFormModule,
    SpinnerModule,
    PageComponentModule,
    YFormCMSModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        CMSFormSubmitComponent: {
          component: CmsCategoryFormSubmitComponent,
        },
      },
    }),
  ],
  declarations: [CmsCategoryFormSubmitComponent],
  exports: [CmsCategoryFormSubmitComponent],
  entryComponents: [CmsCategoryFormSubmitComponent],
})
export class CategoryFormsModule {}
