import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigModule, CmsConfig, I18nModule, CmsModule } from '@spartacus/core';
import { CmsCustomDefinedContainer } from './cms-custom-defined-container';
import { PageComponentModule } from '@spartacus/storefront';

@NgModule({
  imports: [
    CommonModule,
    I18nModule,
    PageComponentModule,
    CmsModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        CMSCustomDefineStyleCMSComponentsContainer: {
            component: CmsCustomDefinedContainer
          }
      }
    }),
  ],
  declarations: [CmsCustomDefinedContainer],
  exports: [CmsCustomDefinedContainer],
  entryComponents: [CmsCustomDefinedContainer]
})
export class CustomDefinedContainerModule { }
