import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigModule, CmsConfig, I18nModule } from '@spartacus/core';
import { CmsCategoryFormSubmitComponent } from './cms-category-form-submit-component';
import { FormContainerModule } from '@fsa/dynamicforms';
import { FormConfig } from '@fsa/dynamicforms';
import { CustomFormInputComponent } from '../custom-form-input/custom-form-input.component';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    FormContainerModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        CMSFormSubmitComponent: {
          component: CmsCategoryFormSubmitComponent,
        },
      },
    }),
    ConfigModule.withConfig(<FormConfig>{
      components: {
        input: {
          component: CustomFormInputComponent,
        },
      },
    }),
  ],
  declarations: [CmsCategoryFormSubmitComponent, CustomFormInputComponent],
  exports: [CmsCategoryFormSubmitComponent, CustomFormInputComponent],
  entryComponents: [CmsCategoryFormSubmitComponent, CustomFormInputComponent],
})
export class CategoryFormsModule {}
