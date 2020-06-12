import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigModule, CmsConfig } from '@spartacus/core';
import { DynamicFormModule } from '@fsa/dynamicforms';
import { SpinnerModule } from '@spartacus/storefront';
import { GeneralInformationComponent } from './general-information.component';

@NgModule({
  imports: [
    CommonModule,
    DynamicFormModule,
    SpinnerModule,
    ConfigModule.withConfig(<CmsConfig>{
      cmsComponents: {
        GeneralInformationFlex: {
          component: GeneralInformationComponent,
        },
      },
    }),
  ],
  declarations: [GeneralInformationComponent],
  exports: [GeneralInformationComponent],
  entryComponents: [GeneralInformationComponent],
})
export class GeneralInformationModule {}
