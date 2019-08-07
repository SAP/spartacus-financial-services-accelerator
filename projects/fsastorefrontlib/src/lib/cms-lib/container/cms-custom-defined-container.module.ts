import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigModule, CmsConfig, I18nModule, CmsModule } from '@spartacus/core';
import { CmsCustomDefinedContainerComponent } from './cms-custom-defined-container';
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
            component: CmsCustomDefinedContainerComponent
          }
      }
    }),
  ],
  declarations: [CmsCustomDefinedContainerComponent],
  exports: [CmsCustomDefinedContainerComponent],
  entryComponents: [CmsCustomDefinedContainerComponent]
})
export class CustomDefinedContainerModule { }
