import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigModule, CmsConfig, I18nModule } from '@spartacus/core';
import { CmsCategoryFormSubmitComponent } from './cms-category-form-submit-component';
import { FSFormsioModule } from '../../../checkout/assets/components/formio/formio.module';

@NgModule({
  imports: [
    CommonModule,
    FSFormsioModule,
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
