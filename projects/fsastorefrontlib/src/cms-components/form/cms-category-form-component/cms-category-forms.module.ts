import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigModule, CmsConfig, I18nModule } from '@spartacus/core';
import { CmsCategoryFormSubmitComponent } from './cms-category-form-submit-component';
import { DynamicFormModule } from '@fsa/dynamicforms';
import { defaultFormConfig } from 'projects/dynamicforms/src/core/config/default-form-config';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    DynamicFormModule,
    ConfigModule.withConfig(defaultFormConfig),
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
