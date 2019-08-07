import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigModule, CmsConfig, I18nModule } from '@spartacus/core';
import { CmsCategoryFormSubmitComponent } from './cms-category-form-submit-component';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        CMSFormSubmitComponent: {
            component: CmsCategoryFormSubmitComponent
          }
      }
    }),
  ],
  declarations: [CmsCategoryFormSubmitComponent],
  exports: [CmsCategoryFormSubmitComponent],
  entryComponents: [CmsCategoryFormSubmitComponent]
})
export class CategoryFormsModule { }
