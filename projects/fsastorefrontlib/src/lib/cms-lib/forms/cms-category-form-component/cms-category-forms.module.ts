import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigModule, CmsConfig, I18nModule } from '@spartacus/core';
import { CmsCategoryFormSubmitComponent } from './cms-category-form-submit-component';
import { FSFormsModule } from '../../../checkout/assets/components/forms/form.module';
import { FSFormsioModule } from '../../../checkout/assets/components/formio/formio.module';
import { FormioManagerModule } from '../../../checkout/assets/components/formio/manager/formioManager.module';



@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    FSFormsModule,
    FSFormsioModule,
    FormioManagerModule,
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
