import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigModule, CmsConfig, I18nModule } from '@spartacus/core';
import { CmsCategoryFormSubmitComponent } from './cms-category-form-submit-component';
import { TestFormComponent } from './test-form-component';
import { DynamicFormModule, FormConfig } from '@fsa/dynamicforms';
import { SpinnerModule } from '@spartacus/storefront';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    DynamicFormModule,
    SpinnerModule,
    ConfigModule.withConfig(<CmsConfig | FormConfig>{
      cmsComponents: {
        CMSFormSubmitComponent: {
          component: CmsCategoryFormSubmitComponent,
        },
      },
      components: {
        input: {
          component: TestFormComponent,
        },
      },
    }),
  ],
  declarations: [CmsCategoryFormSubmitComponent, TestFormComponent],
  exports: [CmsCategoryFormSubmitComponent],
  entryComponents: [CmsCategoryFormSubmitComponent, TestFormComponent],
})
export class CategoryFormsModule {}
